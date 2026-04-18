using IsSureci.Application.DTOs;
using IsSureci.Application.Interfaces;
using IsSureci.Domain.Entities;

namespace IsSureci.Application.Services;

public class GorevService
{
    private readonly IGorevRepository _repo;

    public GorevService(IGorevRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<GorevDto>> GetAllAsync()
    {
        var gorevler = await _repo.GetAllAsync();
        return gorevler.Select(g => new GorevDto
        {
            Id = g.Id,
            Baslik = g.Baslik,
            Aciklama = g.Aciklama,
            Durum = g.Durum,
            OlusturmaTarihi = g.OlusturmaTarihi,
            AtananKullaniciAd = g.AtananKullanici?.Ad
        }).ToList();
    }

    public async Task<GorevDto?> GetByIdAsync(int id)
    {
        var g = await _repo.GetByIdAsync(id);
        if (g == null) return null;
        return new GorevDto
        {
            Id = g.Id,
            Baslik = g.Baslik,
            Aciklama = g.Aciklama,
            Durum = g.Durum,
            OlusturmaTarihi = g.OlusturmaTarihi,
            AtananKullaniciAd = g.AtananKullanici?.Ad
        };
    }

    public async Task<GorevDto> CreateAsync(GorevOlusturDto dto)
    {
        var gorev = new Gorev
        {
            Baslik = dto.Baslik,
            Aciklama = dto.Aciklama,
            AtananKullaniciId = dto.AtananKullaniciId
        };
        var created = await _repo.CreateAsync(gorev);
        return new GorevDto
        {
            Id = created.Id,
            Baslik = created.Baslik,
            Aciklama = created.Aciklama,
            Durum = created.Durum,
            OlusturmaTarihi = created.OlusturmaTarihi
        };
    }

    public async Task<bool> DeleteAsync(int id) => await _repo.DeleteAsync(id);

    public async Task<GorevDto?> UpdateDurumAsync(int id, GorevGuncelleDto dto)
{
    var gorev = await _repo.GetByIdAsync(id);
    if (gorev == null) return null;

    gorev.Baslik = dto.Baslik;
    gorev.Aciklama = dto.Aciklama;
    gorev.Durum = dto.Durum;
    gorev.AtananKullaniciId = dto.AtananKullaniciId;

    var updated = await _repo.UpdateAsync(gorev);
    if (updated == null) return null;

    return new GorevDto
    {
        Id = updated.Id,
        Baslik = updated.Baslik,
        Aciklama = updated.Aciklama,
        Durum = updated.Durum,
        OlusturmaTarihi = updated.OlusturmaTarihi,
        AtananKullaniciAd = updated.AtananKullanici?.Ad
    };
}
}