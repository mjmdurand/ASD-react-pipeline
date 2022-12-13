import { GET, POST, DELETE } from "./config";

export const postComments = (
  url: string,
  body: { comment: { body: string } }
) => POST(url, body);

export const getComments = (url: string) => GET(url);

export const deleteComment = (url: string) => DELETE(url);
