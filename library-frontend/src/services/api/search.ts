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
        // Safely access title from pagemap
        const title = item.pagemap?.book?.[0]?.name || item.title || "";

        processedResults.set(bookUrl, {
          id: bookUrl,
          title: title,
          author: "Unknown",
          isbn: "",
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
