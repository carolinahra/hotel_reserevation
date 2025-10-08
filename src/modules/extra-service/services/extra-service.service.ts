import { ExtraService } from "../models/extra-service";

interface GetExtraService {
  id?: number;
  name?: string;
  price?: number;
  limit?: number;
  offset?: number;
}

interface UpdateExtraService {
  name: string;
  price?: number;
  newPrice?: number;
}

interface InsertExtraService {
  name: string;
  price: number;
}
interface DeleteExtraService {
  name: string;
}

export class ExtraServiceService {
  constructor(private readonly repository: ExtraServiceService) {}

  public get(
    getExtraService: GetExtraService
  ): Promise<ExtraService | ExtraService[]> {
    return this.repository.get(getExtraService);
  }
  public update(updateExtraService: UpdateExtraService): Promise<ExtraService> {
    return this.repository.update(updateExtraService);
  }
  public insert(insertExtraService: InsertExtraService): Promise<ExtraService> {
    return this.repository.insert(insertExtraService);
  }
  public delete(deleteExtraService: DeleteExtraService): Promise<boolean> {
    return this.repository.delete(deleteExtraService);
  }
}
