import { BookDetails } from "./src/components/BookDetails";

export const emptyImage =
  "/Users/galis/Library/Mobile Documents/com~apple~CloudDocs/PROGRAMACION/Pruebas-tecnicas/bubbo/bubbo-front-end/assets/empty-image.jpeg";

export const fetchBooks = async () => {
  const response = await fetch(
    "https://us-central1-bubbo-88234.cloudfunctions.net/app/books",
    {
      method: "GET",
    }
  );
  return response;
};

export const fetchBookById = async (id: string | null) => {
  const response = await fetch(
    `https://us-central1-bubbo-88234.cloudfunctions.net/app/books/${id}`,
    { method: "GET" }
  );
  return response;
};

export const fetchDeleteBook = async (id: string | null) => {
  const response = await fetch(
    `https://us-central1-bubbo-88234.cloudfunctions.net/app/books/${id}`,
    { method: "DELETE" }
  );
  return response;
};

export const fetchAddBook = async (data: BookDetails) => {
  const response = await fetch(
    `https://us-central1-bubbo-88234.cloudfunctions.net/app/books/`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const fetchUpdateBook = async (
  id: string | undefined,
  data: BookDetails
) => {
  const response = await fetch(
    `https://us-central1-bubbo-88234.cloudfunctions.net/app/books/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
