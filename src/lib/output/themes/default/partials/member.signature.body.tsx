import { hasDefaultValue, hasType, isReflectionType } from "../../lib";
import { DefaultThemeRenderContext } from "../DefaultThemeRenderContext";
import * as React from "react";
import { SignatureReflection } from "../../../../models";
export const memberSignatureBody =
    ({ partials, Markdown }: DefaultThemeRenderContext) =>
    (props: SignatureReflection, { hideSources = false }: { hideSources?: boolean } = {}) =>
        (
            <>
                {!hideSources && <> {partials.memberSources(props)}</>}
                {partials.comment(props)}

                {!!props.typeParameters && (
                    <>
                        <h4 className="tsd-type-parameters-title">Type parameters</h4>
                        {partials.typeParameters(props)}
                    </>
                )}
                {props.parameters && props.parameters.length > 0 && (
                    <>
                        <h4 className="tsd-parameters-title">Parameters</h4>
                        <ul className="tsd-parameters">
                            {props.parameters.map((item) => (
                                <li>
                                    <h5>
                                        {item.flags.map((item) => (
                                            <>
                                                <span className={"tsd-flag ts-flag" + item}>{item}</span>{" "}
                                            </>
                                        ))}
                                        {!!item.flags.isRest && <span className="tsd-signature-symbol">...</span>}
                                        {item.name}
                                        {": "}
                                        {item.type && partials.type(item.type)}
                                        {hasDefaultValue(item) && (
                                            <span className="tsd-signature-symbol">
                                                {" = "}
                                                {item.defaultValue}
                                            </span>
                                        )}
                                    </h5>
                                    {partials.comment(item)}
                                    {hasType(item) &&
                                        isReflectionType(item.type) &&
                                        !!item.type.declaration &&
                                        partials.parameter(item.type.declaration)}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                {hasType(props) && (
                    <>
                        <h4 className="tsd-returns-title">
                            {"Returns "}
                            {partials.type(props.type)}
                        </h4>
                        {!!props.comment?.returns && <Markdown>{props.comment.returns}</Markdown>}
                        {isReflectionType(props.type) &&
                            props.type.declaration &&
                            partials.parameter(props.type.declaration)}
                    </>
                )}
            </>
        );