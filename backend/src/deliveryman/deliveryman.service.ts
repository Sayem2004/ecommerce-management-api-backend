import { Injectable } from "@nestjs/common";
import { DeliverymanDTO } from "./deliveryman.dto";

@Injectable()
export class DeliverymanService {

    private data: DeliverymanDTO[] = [];

    getAll(): object {
        return { message: "All Deliveryman", data: this.data };
    }

    getById(id: number): object {
        return { message: "Deliveryman Found", id: id };
    }

    getByIdAndName(id: number, name: string): object {
        return { message: "Deliveryman Found", id: id, name: name };
    }

    create(info: DeliverymanDTO): object {
        this.data.push(info);
        return { message: "Created", data: info };
    }

    update(id: number, info: DeliverymanDTO): object {
        return { message: "Updated", id: id, data: info };
    }

    updateStatus(id: number, status: string): object {
        return { message: "Status Updated", id: id, status: status };
    }

    remove(id: number): object {
        return { message: "Deleted", id: id };
    }

    search(area: string): object {
        return { message: "Search Result", area: area };
    }
}
