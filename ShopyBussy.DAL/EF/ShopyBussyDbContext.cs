using Microsoft.EntityFrameworkCore;
using ShopyBussy.DAL.Entity;


namespace Shopy_Bussy.DAL.EF
{
    public class ShopyBussyDbContext : DbContext
    {
        public DbSet<Bus> Buses { get; set; }
        public DbSet<City> Citys { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<SeatTemplate> SeatTemplates { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<TripStop> TripStops { get; set; }
        public DbSet<User> Users { get; set; }



        public ShopyBussyDbContext(DbContextOptions<ShopyBussyDbContext> options)
            : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("User ID=postgres;Password='    ';Host=localhost;Port=5432;Database=ShopyBussy",
                    sql => sql.MigrationsAssembly("ShopyBussy.DAL"));
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 1. ЗАПРЕЩАЕМ EF Core даже смотреть на эти классы:
            modelBuilder.Ignore<LayoutCell>();
            modelBuilder.Ignore<List<LayoutCell>>(); // <-- НОВАЯ СТРОКА, которая решит проблему

            // 2. Указываем, что всю матрицу нужно просто превратить в текст (JSON)
            modelBuilder.Entity<SeatTemplate>()
                .Property(e => e.LayoutData)
                .HasConversion(
                    v => System.Text.Json.JsonSerializer.Serialize(v, (System.Text.Json.JsonSerializerOptions?)null),
                    v => System.Text.Json.JsonSerializer.Deserialize<List<List<LayoutCell>>>(v, (System.Text.Json.JsonSerializerOptions?)null) ?? new List<List<LayoutCell>>()
                )
                .HasColumnType("jsonb");
        }
    }
}
