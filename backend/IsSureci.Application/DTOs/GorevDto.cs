using IsSureci.Domain.Enums;

namespace IsSureci.Application.DTOs;

public class GorevDto
{
    public int Id { get; set; }
    public string Baslik { get; set; } = string.Empty;
    public string Aciklama { get; set; } = string.Empty;
    public GorevDurumu Durum { get; set; }
    public DateTime OlusturmaTarihi { get; set; }
    public string? AtananKullaniciAd { get; set; }
}

public class GorevOlusturDto
{
    public string Baslik { get; set; } = string.Empty;
    public string Aciklama { get; set; } = string.Empty;
    public int? AtananKullaniciId { get; set; }
}

public class GorevGuncelleDto
{
    public string Baslik { get; set; } = string.Empty;
    public string Aciklama { get; set; } = string.Empty;
    public GorevDurumu Durum { get; set; }
    public int? AtananKullaniciId { get; set; }
}