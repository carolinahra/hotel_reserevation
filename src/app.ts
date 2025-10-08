import { GetGuestRequestDTO } from "@guest/requests/get-guest.request.dto";
import { Container } from "@shared/container";
import express from "express";
import "dotenv/config";
import type {
  Request,
  NextFunction,
  Response,
} from "express";

const app = express();
const port = 3000;

app.use(express.json());

const container = new Container({
  database: {
    driver: "mysql",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  log: {
    logPath: process.env.LOG_PATH,
  },
});

const logService = container.logService;
const exceptionService = container.exceptionService;

app.use((req: Request, res: Response, next: NextFunction) => {
  logService.start();
  logService.collect({ request: req });

  const originalSend = res.send.bind(res);
  // Puede que sobre el bind y al call haya que pasarle el res
  // O puede que no y esté bien
  // Pendiente testeo
  res.send = function (body?: any) {
    logService.collect({ responseBody: body });
    logService.log();

    return originalSend.call(body);
  } as typeof originalSend;
  next();
});

const guestController = container.guestController;

app.get("/customers", (req, res) => {
  const request = GetGuestRequestDTO.fromRequest({
    name: req.query.name,
    phone: req.query.phone,
    email: req.query.email,
    limit: req.query.limit,
    offset: req.query.offset,
  });

  guestController
    .get(request)
    .then((guests) =>
      res.send(
        Array.isArray(guests)
          ? guests.map((guest) => guest.toPrimitives())
          : guests.toPrimitives()
      )
    )
    .catch((error) => exceptionService.handle(error));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
