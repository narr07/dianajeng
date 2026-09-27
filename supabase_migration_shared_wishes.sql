-- Jalankan SEKALI di Supabase SQL Editor untuk database yang sudah dibuat
-- dengan supabase_schema.sql versi lama. Aman dijalankan ulang.
--
-- Menyiapkan tabel wishes agar dipakai bersama oleh website internasional (en)
-- dan website Indonesia (id).

-- 1. Status kehadiran jadi kode netral: 'yes' / 'maybe' / 'no'
update public.wishes set attendance = case
  when attendance in ('yes', 'Attending', 'Hadir') then 'yes'
  when attendance in ('maybe', 'Tentative', 'Mungkin', 'Masih ragu') then 'maybe'
  else 'no'
end;
alter table public.wishes alter column attendance set default 'yes';
alter table public.wishes alter column attendance set not null;

-- 2. Kolom asal website
alter table public.wishes add column if not exists site text not null default 'en';

-- 3. Batasan data (dilewati jika sudah ada)
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'wishes_attendance_check') then
    alter table public.wishes add constraint wishes_attendance_check check (attendance in ('yes', 'maybe', 'no'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'wishes_site_check') then
    alter table public.wishes add constraint wishes_site_check check (site in ('en', 'id'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'wishes_name_length') then
    alter table public.wishes add constraint wishes_name_length check (char_length(name) between 1 and 60);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'wishes_message_length') then
    alter table public.wishes add constraint wishes_message_length check (char_length(message) between 1 and 500);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'wishes_likes_positive') then
    alter table public.wishes add constraint wishes_likes_positive check (likes >= 0);
  end if;
end $$;

alter table public.wishes alter column likes set not null;

-- 4. Index untuk urutan terbaru
create index if not exists wishes_created_at_idx on public.wishes (created_at desc);
