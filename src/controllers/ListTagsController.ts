import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";

export class ListTagsController {
    async handle(request: Request, response: Response) {
        const listTagsService = new ListTagsService()

        const tags = await listTagsService.execute()

        console.log(tags)

        return response.json(tags)
    }
}