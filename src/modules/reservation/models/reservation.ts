import { ValueObject } from "@shared/value-object";

interface ReservationProps {
  id: number,
  guest_id: number,
  external_reference: string,
  total_price: number,
  payment_status: string,
  check_in_date: string,
  check_out_date: string,
  created_at: string,
  updated_at: string,
}

export class Reservation extends ValueObject<ReservationProps> {
  get id() {
    return this.props.id;
  }

  get guest_id() {
    return this.props.guest_id;
  }

  get external_reference() {
    return this.props.external_reference;
  }

  get total_price() {
    return this.props.total_price;
  }

  get payment_status() {
    return this.props.payment_status;
  }

  get check_in_date() {
    return this.props.check_in_date;
  }

  get check_out_date() {
    return this.props.check_out_date;
  }

  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }
}
