using IsSureci.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace IsSureci.Infrastructure.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Gorev> Gorevler { get; set; }
    public DbSet<Kullanici> Kullanicilar { get; set; }
}