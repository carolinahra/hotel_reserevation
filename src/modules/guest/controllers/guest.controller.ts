import { GuestNotFoundException } from "@guest/exceptions/guest-not-found-exception";
import { GetGuestRequestDTO } from "@guest/requests/get-guest.request.dto";
import { InsertGuestRequestDTO } from "@guest/requests/insert-guest.request.dto";
import { UpdateGuestRequestDTO } from "@guest/requests/update-guest.request.dto";
import { GuestService } from "@guest/services/guest.service";

export class GuestController {
  constructor(private readonly guestService: GuestService) {}
  public get(request: GetGuestRequestDTO) {
    return this.guestService.get(request).catch(() => {
      throw new GuestNotFoundException();
    });
  }

  public update(request: UpdateGuestRequestDTO) {
    return this.guestService.update(request);
  }

  public insert(request: InsertGuestRequestDTO) {
    return this.guestService.insert(request).catch(() => {
      throw new GuestNotFoundException();
    });
  }
}
