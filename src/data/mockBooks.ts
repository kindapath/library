import { Book } from "@/types/book";

export const mockBooks: Book[] = [
  {
    bookId: 1,
    isbn: null,
    title: "Органическая химия для чайников",
    bookType: "DIGITAL",
    publicationDate: "2024-12-10",
    pageCount: 259,
    authors: [
      {
        firstName: "Иван",
        lastName: "Иванов",
        patronymic: "Иванович",
        biography: "Ученый РАН",
      },
    ],
    publisher: {
      name: "АИСТ",
      city: "Москва",
      country: "Россия",
    },
    amount: 300,
    available: true,
    imageUrl: "https://ir.ozone.ru/multimedia/c1000/1020988122.jpg",
  },
  {
    bookId: 2,
    isbn: "978-5-17-982345-1",
    title: "Программирование на Python",
    bookType: "DIGITAL",
    publicationDate: "2023-08-15",
    pageCount: 450,
    authors: [
      {
        firstName: "Петр",
        lastName: "Сидоров",
        patronymic: "Алексеевич",
        biography: "Ведущий разработчик, PhD",
      },
    ],
    publisher: {
      name: "Эксмо",
      city: "Санкт-Петербург",
      country: "Россия",
    },
    amount: 0,
    available: false,
    imageUrl:
      "https://www.hachettebookgroup.com/wp-content/uploads/2020/06/python-book.jpg",
  },
  {
    bookId: 3,
    isbn: null,
    title: "Искусство войны",
    bookType: "DIGITAL",
    publicationDate: "2024-01-20",
    pageCount: 156,
    authors: [
      {
        firstName: "Сунь",
        lastName: "Цзы",
        patronymic: "",
        biography: "Древнекитайский стратег и мыслитель",
      },
    ],
    publisher: {
      name: "ЛитРес",
      city: "Москва",
      country: "Россия",
    },
    amount: 1000,
    available: true,
    imageUrl: "https://ir.litres.ru/pub/c/cover/67246928.jpg",
  },
  {
    bookId: 4,
    isbn: "978-5-699-12345-6",
    title: "История России",
    bookType: "DIGITAL",
    publicationDate: "2023-12-01",
    pageCount: 800,
    authors: [
      {
        firstName: "Мария",
        lastName: "Петрова",
        patronymic: "Сергеевна",
        biography: "Профессор исторических наук МГУ",
      },
      {
        firstName: "Александр",
        lastName: "Соколов",
        patronymic: "Дмитриевич",
        biography: "Доцент кафедры истории",
      },
    ],
    publisher: {
      name: "Просвещение",
      city: "Москва",
      country: "Россия",
    },
    amount: 50,
    available: true,
    imageUrl: "https://m.media-amazon.com/images/russian-history-textbook.jpg",
  },
  // Add more mock books as needed
];
