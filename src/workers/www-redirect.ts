const canonicalHostname = "lifehomepuertollano.es";

export default {
  fetch(request: Request): Response {
    const destination = new URL(request.url);
    destination.protocol = "https:";
    destination.hostname = canonicalHostname;

    return Response.redirect(destination, 301);
  },
};
