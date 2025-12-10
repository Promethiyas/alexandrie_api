export type Book = {
    title: string,
    isbn_13: string,
    isbn_10: string | null,
    number_of_pages: number | null,
    authors: string[] | null,
    publish_date: string | null,
    publishers: string | null,
    cover: string | null,
    [key: string]: any;
}

export type InsertSql = {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    info: string,
    serverStatus: number,
    warningStatus: number,
    changedRows: number
}

type BufferLike = {
  type: "Buffer";
  data: number[];
};

type Item = {
  id: BufferLike;
};

export type Login = Item[];