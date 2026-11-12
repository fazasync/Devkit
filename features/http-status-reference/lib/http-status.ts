export interface HttpStatusEntry {
  code: number;
  name: string;
  description: string;
  category: string;
}

export const HTTP_STATUSES: HttpStatusEntry[] = [
  { code: 100, name: "Continue", description: "Request received, continue.", category: "Informational" },
  { code: 101, name: "Switching Protocols", description: "Switching to a new protocol.", category: "Informational" },
  { code: 102, name: "Processing", description: "Server is processing.", category: "Informational" },
  { code: 103, name: "Early Hints", description: "Hints for preloading.", category: "Informational" },
  { code: 200, name: "OK", description: "Request succeeded.", category: "Success" },
  { code: 201, name: "Created", description: "Resource created.", category: "Success" },
  { code: 202, name: "Accepted", description: "Request accepted for processing.", category: "Success" },
  { code: 204, name: "No Content", description: "No content to return.", category: "Success" },
  { code: 206, name: "Partial Content", description: "Partial resource returned.", category: "Success" },
  { code: 301, name: "Moved Permanently", description: "Resource moved permanently.", category: "Redirection" },
  { code: 302, name: "Found", description: "Resource found at another URI.", category: "Redirection" },
  { code: 304, name: "Not Modified", description: "Resource not modified.", category: "Redirection" },
  { code: 307, name: "Temporary Redirect", description: "Temporary redirect, method preserved.", category: "Redirection" },
  { code: 308, name: "Permanent Redirect", description: "Permanent redirect, method preserved.", category: "Redirection" },
  { code: 400, name: "Bad Request", description: "Malformed request.", category: "Client Error" },
  { code: 401, name: "Unauthorized", description: "Authentication required.", category: "Client Error" },
  { code: 403, name: "Forbidden", description: "Access forbidden.", category: "Client Error" },
  { code: 404, name: "Not Found", description: "Resource not found.", category: "Client Error" },
  { code: 405, name: "Method Not Allowed", description: "HTTP method not allowed.", category: "Client Error" },
  { code: 408, name: "Request Timeout", description: "Request timed out.", category: "Client Error" },
  { code: 409, name: "Conflict", description: "Request conflicts with state.", category: "Client Error" },
  { code: 410, name: "Gone", description: "Resource no longer available.", category: "Client Error" },
  { code: 413, name: "Payload Too Large", description: "Payload too large.", category: "Client Error" },
  { code: 415, name: "Unsupported Media Type", description: "Unsupported media type.", category: "Client Error" },
  { code: 422, name: "Unprocessable Entity", description: "Semantic errors.", category: "Client Error" },
  { code: 429, name: "Too Many Requests", description: "Rate limit exceeded.", category: "Client Error" },
  { code: 500, name: "Internal Server Error", description: "Server error.", category: "Server Error" },
  { code: 501, name: "Not Implemented", description: "Not implemented.", category: "Server Error" },
  { code: 502, name: "Bad Gateway", description: "Bad gateway.", category: "Server Error" },
  { code: 503, name: "Service Unavailable", description: "Service unavailable.", category: "Server Error" },
  { code: 504, name: "Gateway Timeout", description: "Gateway timeout.", category: "Server Error" },
];

export function searchStatuses(query: string): HttpStatusEntry[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return HTTP_STATUSES;
  return HTTP_STATUSES.filter(
    (s) =>
      String(s.code).includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q),
  );
}