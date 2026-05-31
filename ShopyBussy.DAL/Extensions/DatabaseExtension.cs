using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shopy_Bussy.DAL.EF;
using ShopyBussy.DAL.Entity;
using ShopyBussy.DAL.Interfaces;

namespace ShopyBussy.DAL.Extensions
{
    public static class DatabaseExtension
    {
        public static void InjectDatabaseServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDatabase(configuration);
            services.AddScoped<IBus, Bus>();
            services.AddScoped<ICity, City>();
            services.AddScoped<ICompany, Company>();
            services.AddScoped<ISeatTemplate, SeatTemplate>();
            services.AddScoped<ITicket, Ticket>();
            services.AddScoped<ITrip, Trip>();
            services.AddScoped<ITripStop, TripStop>();
            services.AddScoped<IUser, User>();

        }

        public static void UseDatabase(this IServiceProvider services)
        {
            using (var scope = services.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                try
                {
                    var context = serviceProvider.GetRequiredService<ShopyBussyDbContext>();
                    context.Database.EnsureCreated();
                }
                catch (Exception exception)
                {
                    throw exception;
                }
            }
        }

        private static void AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            //services.AddDbContext<ShopyBussyDbContext>(options =>
            //    options.UseNpgsql(configuration.GetConnectionString(nameof(ShopyBussyDbContext))));
            services.AddDbContext<ShopyBussyDbContext>(options =>
                options.UseNpgsql("User ID=postgres;Password='    ';Host=localhost;Port=5432;Database=ShopyBussy;"));
        }
    }
}
