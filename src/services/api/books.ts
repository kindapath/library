import { GetBooksResponse } from "@/types/api";
import { ExternalBook } from "@/types/book";

export const bookService = {
  getBooks: async (): Promise<GetBooksResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/university/library/book/books?sort=DESC`
    );
    if (!response.ok) throw new Error("Failed to fetch books");

    const data = await response.json();
    return data;
  },

  searchLocal: async (query: string): Promise<GetBooksResponse> => {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/v1/university/library/book/books?sort=DESC&title=${encodeURIComponent(
        query
      )}`
    );
    if (!response.ok) throw new Error("Failed to search books");

    const data = await response.json();
    return data;
  },

  downloadBook: async (id: string): Promise<Blob> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/university/library/book/download/${id}`
    );
    if (!response.ok) throw new Error("Ошибка при скачивании книги");
    console.log("download", response);
    const blob = await response.blob();
    return blob;
  },

  searchGoogle: async (query: string): Promise<ExternalBook[]> => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const CX = process.env.NEXT_PUBLIC_GOOGLE_CX;

    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(
        query
      )}&lr=lang_ru`
    );

    if (!response.ok) throw new Error("Failed to search Google");
    const data = await response.json();

    const processedResults = new Map<string, ExternalBook>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.items?.forEach((item: any) => {
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) =>
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
          bookId: bookUrl,
          title: item.pagemap?.book?.[0]?.name || item.title || "",
          authors: author,
          isbn: item.pagemap?.book?.[0]?.isbn || null,
          publishedYear:
            parseInt(item.pagemap?.book?.[0]?.datePublished) || undefined,
          available: true,
          imageUrl: item.pagemap?.cse_image?.[0]?.src || undefined,
          isExternal: true,
          sourceUrl: bookUrl,
        });
      }
    });

    return Array.from(processedResults.values());
  },
};

export default bookService;
