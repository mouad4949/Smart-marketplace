using MissionGenerator.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// --- Début de nos ajouts ---

// 1. Configuration de la politique CORS pour autoriser votre frontend React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // L'adresse de votre app React en dev
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 2. Add HttpClient for external API calls
builder.Services.AddHttpClient();

// 3. Injection de dépendances pour notre service d'IA
builder.Services.AddScoped<IAiMissionGenerator, GeminiMissionGenerator>();
// --- Fin de nos ajouts ---

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// --- Ajout de la politique CORS ---
app.UseCors("AllowReactApp");
// ---

app.UseAuthorization();

app.MapControllers();

app.Run();