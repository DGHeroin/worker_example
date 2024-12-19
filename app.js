exports.default = {
    name:"api handler",
    process: async function(request, env, ctx) {
        return new Response(JSON.stringify({ message: 'This is the API endpoint! ' + request.id ,env:env }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
