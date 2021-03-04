import { Test, TestingModule } from "@nestjs/testing";
import { ExampleController } from "../../src/controllers/example.controller";
import { ExampleService } from "../../src/services/example.service";


describe("Downloadable Content Controller", () =>
{
    let controller: ExampleController;
    let service: ExampleService;


    beforeEach(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExampleController],
            providers: [
                {
                    provide: ExampleService,
                    useValue: {
                        test: jest.fn(),
                    },
                }
            ],
        }).compile();

        controller = module.get<ExampleController>(ExampleController);
        service = module.get<ExampleService>(ExampleService);
    });

    it("Test: basic test", async () =>
    {
        const response = "test";
        jest.spyOn(service, "test").mockReturnValue(response);

        expect(controller.test()).toEqual({ test: response });
        expect(service.test).toHaveBeenCalled();
    });
});
