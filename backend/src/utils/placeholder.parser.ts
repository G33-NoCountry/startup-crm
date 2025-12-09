export function parseContent(content: string, data: any): string {
    return content.replace(/\[(\w+)\.(\w+)\]/g, (match, resource, field) => {
        if (data[resource] && data[resource][field]) {
            return data[resource][field];
        }
        return match;
    });
}