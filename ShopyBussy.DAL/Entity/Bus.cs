using ShopyBussy.DAL.Interfaces;

namespace ShopyBussy.DAL.Entity
{
    public enum AmenitiesType
    {
        Wifi = 0,
        Ac = 1,
        Power = 2,
        Wc = 3,
        Tv = 4,
        Drinks = 5
    }
    public class Bus : IBus
    {
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public Guid TemplateId { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string PlateNumber { get; set; } = string.Empty;
        public ICollection<AmenitiesType> Amenities { get; set; } = new HashSet<AmenitiesType>();

    }
}
