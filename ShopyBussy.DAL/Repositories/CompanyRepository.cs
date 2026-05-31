using Microsoft.EntityFrameworkCore;
using Shopy_Bussy.DAL.EF;
using ShopyBussy.DAL.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShopyBussy.DAL.Repositories
{
    public class CompanyRepository
    {
        private readonly ShopyBussyDbContext _context;

        public CompanyRepository(ShopyBussyDbContext context)
        {
            _context = context;
        }

        public async Task<Company> GetByIdAsync(Guid id) =>
           await _context.Companies.SingleOrDefaultAsync(C => C.Id == id);


        public async Task<List<Company>> GetByAllAsync()
        {
            return await _context.Companies.ToListAsync();
        }

        public async Task<bool> CreateAsync(Company company)
        {
            try
            {
                await _context.Companies.AddAsync(company);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed create Company: {ex.Message}"); ;
                return false;
            }
        }

        public async Task<bool> UpdateAsync(Company updatedCompany)
        {
            try
            {
                var existing = await _context.Companies.FindAsync(updatedCompany.Id);
                if (existing == null)
                    return false;

                existing.Name = updatedCompany.Name;
                existing.Email = updatedCompany.Email;
                existing.Description = updatedCompany.Description;
                existing.PayAdress = updatedCompany.PayAdress;
                existing.LofoPath = updatedCompany.LofoPath;


                _context.Companies.Update(existing);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed update Company: {ex.Message}");
                return false;
            }
        }
    }
}
