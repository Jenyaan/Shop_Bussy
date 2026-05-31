using Microsoft.EntityFrameworkCore;
using Shopy_Bussy.DAL.EF;
using ShopyBussy.DAL.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShopyBussy.DAL.Repositories
{
    public class TripRepository
    {
        private readonly ShopyBussyDbContext _context;

        public TripRepository(ShopyBussyDbContext context)
        {
            _context = context;
        }

        public async Task<Trip> GetByIdAsync(Guid id) =>
           await _context.Trips.SingleOrDefaultAsync(C => C.Id == id);


        public async Task<List<Trip>> GetByCompanyIdAsync(Guid companyId)
        {
            return await _context.Trips
                .Where(t => t.CompanyId == companyId)
                .ToListAsync();
        }

        public async Task<bool> CreateAsync(SeatTemplate seatTemplate)
        {
            try
            {
                await _context.SeatTemplates.AddAsync(seatTemplate);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed create SeatTemplate: {ex.Message}"); ;
                return false;
            }
        }
    }
}
