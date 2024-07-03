import express, { Router, Request, Response, NextFunction } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
export const youtube = Router();
youtube.use(express.json());
const YOUTUBE_API_KEY = process.env['YOUTUBE_API_KEY'];
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

youtube.get(
  "/youtube-api/:endpoint",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log ("Youtube API endpoint requested : " +  YOUTUBE_API_KEY)

    const endpoint = req.params["endpoint"];
    const query = { ...req.query, key: YOUTUBE_API_KEY };

    const url = `${YOUTUBE_API_URL}/${endpoint}`;

    try {
      const response = await axios.get(url, { params: query });
      res.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return next(
          new Error(
            error.response?.data?.error?.message || "Error making API request"
          )
        );
      } else {
        return next(new Error("Unexpected error occurred"));
      }
    }
  }
);
