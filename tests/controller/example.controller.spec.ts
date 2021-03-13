import { Test, TestingModule } from "@nestjs/testing";
import { PeekingController } from "../../src/controllers/peeking.controller";
import { PeekingService } from "../../src/services/peeking.service";


describe("Downloadable Content Controller", () =>
{
    let controller: PeekingController;
    let service: PeekingService;


    beforeEach(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PeekingController],
            providers: [
                {
                    provide: PeekingService,
                    useValue: {
                        test: jest.fn(),
                    },
                }
            ],
        }).compile();

        controller = module.get<PeekingController>(PeekingController);
        service = module.get<PeekingService>(PeekingService);
    });

    it("Test: basic test", async () =>
    {
        const response = "test";
        jest.spyOn(service, "test").mockReturnValue(response);

        expect(controller.test()).toEqual({ test: response });
        expect(service.test).toHaveBeenCalled();
    });
});
