import { ValueObject } from "@shared/value-object";
export interface RoomProps {
    id: number,
    name: string,
    room_size_id: number,
    price: number,
    availability: string,
    created_at: string,
    updated_at: string
}

export class Room extends ValueObject<RoomProps>{
    get id() {
        return this.props.id;
    }

    get name() {
        return this.props.name;
    }

    get room_size_id() {
        return this.props.room_size_id;
    }

    get price() {
        return this.props.price;
    }

    get availability() {
        return this.props.availability;
    }

    get created_at() {
        return this.props.created_at;
    }

    get updated_at() {
        return this.props.updated_at;
    }
}