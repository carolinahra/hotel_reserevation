import { ValueObject } from "@shared/value-object";
interface RoomSizeProps {
    id: number,
    name: string,
    size: string
}

export class RoomSize extends ValueObject<RoomSizeProps> {
    get id() {
        return this.props.id;
    }

    get name() {
        return this.props.name;
    }
    get size() {
        return this.props.size;
    }
}