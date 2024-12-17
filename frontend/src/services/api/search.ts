import { Book } from "@/types/book";

export const searchService = {
  searchLocal: async (query: string): Promise<Book[]> => {
    const response = await fetch(
      `/api/books/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Failed to search books");
    return response.json();
  },

  searchGoogle: async (query: string): Promise<Book[]> => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const CX = process.env.NEXT_PUBLIC_GOOGLE_CX;

    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(
        query
      )}&lr=lang_ru`
    );

    if (!response.ok) throw new Error("Failed to search Google");
    const data = await response.json();

    const processedResults = new Map<string, Book>();

    data.items?.forEach((item) => {
      let bookUrl = item.link;

      // Skip non-LitRes book URLs
      if (!bookUrl.includes("https://www.litres.ru/book/")) {
        return;
      }

      const urlParts = bookUrl.split("/");
      if (urlParts.length >= 6) {
        bookUrl = `https://www.litres.ru/book/${urlParts[4]}/${urlParts[5]}`;
      }

      // Only add if this URL hasn't been processed yet
      if (!processedResults.has(bookUrl)) {
        // Extract author using multiple methods
        let author = "Unknown";

        // Try extracting from listitem array first (most reliable for Litres.ru)
        const listItems = item.pagemap?.listitem || [];
        const authorItem = listItems.find(
          (item) =>
            item.position === "3" && item.name && !item.name.includes("Книги")
        );
        if (authorItem?.name) {
          author = authorItem.name;
        }
        // Fallback to person data if listitem not found
        else if (item.pagemap?.person?.[0]?.name) {
          author = item.pagemap.person[0].name;
        }
        // Try extracting from title as last resort
        else if (item.title) {
          const titleParts = item.title.split(/[,\-–]/);
          if (titleParts.length > 1) {
            const possibleAuthor = titleParts[titleParts.length - 1].trim();
            if (possibleAuthor && !possibleAuthor.includes("ЛитРес")) {
              author = possibleAuthor;
            }
          }
        }

        processedResults.set(bookUrl, {
          id: bookUrl,
          title: item.pagemap?.book?.[0]?.name || item.title || "",
          author: author,
          isbn: item.pagemap?.book?.[0]?.isbn || "",
          publishedYear: 0,
          available: false,
          coverImage: item.pagemap?.cse_image?.[0]?.src || null,
          isExternal: true,
          sourceUrl: bookUrl,
          description: item.snippet,
        });

        console.log("item", item);
      }
    });

    return Array.from(processedResults.values());
  },
};
