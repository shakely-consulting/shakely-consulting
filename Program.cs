using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
using MudBlazor.Services;
using Radzen;
using SC.Extensions;
using SC;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.Services.AddMudServices();
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

var DbDir = Path.Combine(Path.Combine(Directory.GetCurrentDirectory(), "database"));
var DatabasePath = Path.Combine(Path.Combine(Directory.GetCurrentDirectory(), "database"), "main.db");

// var db = new SQLiteAsyncConnection(DatabasePath);
// var dropResult = await db.DropTableAsync<Person>();
// var createResult = await db.CreateTableAsync<Person>();
// List<Person> people = new();
// var person = new Person()
// {
//     FirstName = "AAPL",
//     LastName = "Mothafucka",
// };

builder.Services.AddScoped<DialogService>();
builder.Services.AddScoped<NotificationService>();
builder.Services.AddScoped<TooltipService>();
builder.Services.AddScoped<ContextMenuService>();
builder.Services.AddScoped<SideBarService>();

builder.Services.TryAddDocsViewServices();
try
{
    builder.Services.AddDatabaseFeatures();
}
catch (Exception) { /* ignore */ }

await builder.Build().RunAsync();
