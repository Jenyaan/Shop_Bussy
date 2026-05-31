using ShopyBussy.DAL.Extensions;
//using ShopyBussy.Extensions;
//using Microsoft.OpenApi.Models;


var builder = WebApplication.CreateBuilder(args);
IConfiguration configuration = builder.Configuration;


builder.Services.AddCors(options =>
{
    options.AddPolicy("ShopyBussy", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader());
});

//builder.Services.Configure<JwtOptionsModel>(builder.Configuration.GetSection("JwtOptions"));

// Add services to the container.

//builder.Services.AddControllers();
//builder.Services.InjectService();
////builder.Services.InjectJwt(configuration);
builder.Services.InjectDatabaseServices(configuration);


// Add Swagger services
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new OpenApiInfo { Title = "D1ennDSGN API", Version = "v1" });
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("ShopyBussy");

app.UseStaticFiles();

//app.UseSwagger();
//app.UseSwaggerUI(c =>
//{
//    c.SwaggerEndpoint("/swagger/v1/swagger.json", "D1ennDSGN API v1");
//    c.RoutePrefix = "";
//});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

//app.MapControllers();

app.Run();