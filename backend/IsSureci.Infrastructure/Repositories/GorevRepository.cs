using IsSureci.Application.Interfaces;
using IsSureci.Domain.Entities;
using IsSureci.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace IsSureci.Infrastructure.Repositories;

public class GorevRepository : IGorevRepository
{
    private readonly AppDbContext _context;

    public GorevRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Gorev>> GetAllAsync() =>
        await _context.Gorevler.Include(g => g.AtananKullanici).ToListAsync();

    public async Task<Gorev?> GetByIdAsync(int id) =>
        await _context.Gorevler.Include(g => g.AtananKullanici)
            .FirstOrDefaultAsync(g => g.Id == id);

    public async Task<Gorev> CreateAsync(Gorev gorev)
    {
        _context.Gorevler.Add(gorev);
        await _context.SaveChangesAsync();
        return gorev;
    }

    public async Task<Gorev?> UpdateAsync(Gorev gorev)
    {
        _context.Gorevler.Update(gorev);
        await _context.SaveChangesAsync();
        return gorev;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var gorev = await _context.Gorevler.FindAsync(id);
        if (gorev == null) return false;
        _context.Gorevler.Remove(gorev);
        await _context.SaveChangesAsync();
        return true;
    }
}