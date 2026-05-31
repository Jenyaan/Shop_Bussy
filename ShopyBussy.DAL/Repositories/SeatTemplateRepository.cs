using Microsoft.EntityFrameworkCore;
using Shopy_Bussy.DAL.EF;
using ShopyBussy.DAL.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShopyBussy.DAL.Repositories
{
    public class SeatTemplateRepository
    {
        private readonly ShopyBussyDbContext _context;

        public SeatTemplateRepository(ShopyBussyDbContext context)
        {
            _context = context;
        }

        public async Task<SeatTemplate> GetByIdAsync(Guid id) =>
           await _context.SeatTemplates.SingleOrDefaultAsync(C => C.Id == id);


        public async Task<List<SeatTemplate>> GetByCompanyIdAsync(Guid companyId)
        {
            return await _context.SeatTemplates
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
