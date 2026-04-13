using IsSureci.Application.Interfaces;
using IsSureci.Application.Services;
using IsSureci.Infrastructure.Context;
using IsSureci.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Veritabanı
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=issureci.db"));

// Dependency Injection
builder.Services.AddScoped<IGorevRepository, GorevRepository>();
builder.Services.AddScoped<GorevService>();

// CORS - React için
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

// Veritabanını otomatik oluştur
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.Run();