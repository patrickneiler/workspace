import { z } from "zod";
import { TAnyToolDefinitionArray } from "./tool-definition";

export type CompletionResponse<TFunctions extends TAnyToolDefinitionArray, TToolMap> = {
    onTextContent: (
      callback: (text: string, isFinal: boolean) => void | Promise<void>,
    ) => void;
    onFunctionCall: <TName extends TFunctions[number]['name']>(
      name: TName,
      callback: (
        args: z.output<
          TName extends keyof TToolMap
          ? TToolMap[TName] extends infer TToolDef
          ? TToolDef extends TAnyToolDefinitionArray[number]
          ? TToolDef['parameters']
          : never
          : never
          : never
        >,
      ) => void | Promise<void>,
    ) => void;
  };