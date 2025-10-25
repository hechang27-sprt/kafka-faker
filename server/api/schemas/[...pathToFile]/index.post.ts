import path from "node:path";
import sanitizeFilename from "sanitize-filename";

export default defineEventHandler(async (event) => {
    const route = useRoute();
    const pathSegments = route.params.pathToFile!;
    const pathSegmentsArray =
        typeof pathSegments === "string" ? [pathSegments] : pathSegments;

    const sanitize = (segment: string) => {
        return sanitizeFilename(segment);
    };
    const sanitizedPath = path.join(...pathSegmentsArray.map(sanitize));

    const contentType = getRequestHeader(event, "content-type");
    if (contentType?.includes("application/json")) {
        const body = await readBody<string>(event);
    } else if (contentType?.includes("multipart/form-data")) {
        const formData = await readMultipartFormData(event);
        if (!formData) {
            throw createError({
                status: 400,
                statusText: "No form data found",
            });
        }
    }
});
