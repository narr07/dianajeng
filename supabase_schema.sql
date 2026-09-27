-- Tabel ucapan & doa (Wishes)
-- Dipakai bersama oleh website internasional dan website Indonesia.
create table if not exists public.wishes (
  id uuid default gen_random_uuid() primary key,
  name text not null check (char_length(name) between 1 and 60),
  message text not null check (char_length(message) between 1 and 500),
  -- kode netral, diterjemahkan oleh masing-masing website:
  -- 'yes' = hadir, 'maybe' = mungkin, 'no' = berhalangan
  attendance text not null default 'yes' check (attendance in ('yes', 'maybe', 'no')),
  -- website asal ucapan: 'en' (internasional) atau 'id' (Indonesia).
  -- Hanya informasi; kedua website menampilkan semua ucapan bersama.
  site text not null default 'en' check (site in ('en', 'id')),
  likes integer not null default 0 check (likes >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists wishes_created_at_idx on public.wishes (created_at desc);

-- Aktifkan Row Level Security (RLS)
alter table public.wishes enable row level security;

-- Policy agar semua tamu undangan dapat membaca dan mengirim ucapan
create policy "Allow public read wishes" 
  on public.wishes for select 
  using (true);

create policy "Allow public insert wishes" 
  on public.wishes for insert 
  with check (true);

create policy "Allow public update likes" 
  on public.wishes for update 
  using (true)
  with check (true);

-- Batasi update hanya ke kolom likes, supaya tamu tidak bisa mengubah
-- nama atau pesan milik orang lain
revoke update on public.wishes from anon, authenticated;
grant update (likes) on public.wishes to anon, authenticated;

-- Aktifkan Supabase Realtime untuk tabel wishes
alter publication supabase_realtime add table public.wishes;
