import { v4 } from "uuid";

export class GeneratorID{

    generate(): string{
        return v4();
    }
}