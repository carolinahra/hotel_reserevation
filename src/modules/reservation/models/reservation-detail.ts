import { ValueObject } from "@shared/value-object";
interface ReservationDetailProps {
  id: number;
  reservation_id: number;
  room_id: number;
  extra_service_id: number;
}
export class ReservationDetail extends ValueObject<ReservationDetailProps> {
  public get number() {
    return this.props.id;
  }
  
  public get reservation_id() {
    return this.props.reservation_id;
  }
  public get room_id() {
    return this.props.room_id;
  }
  public get extra_service_id() {
    return this.props.extra_service_id;
  }
}
