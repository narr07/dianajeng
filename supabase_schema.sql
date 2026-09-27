-- Tabel ucapan & doa (Wishes)
create table if not exists public.wishes (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  message text not null,
  attendance text default 'Hadir',
  likes integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

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
