PGDMP     -                    x         
   safetyInfo    12.3    12.3 R    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17411 
   safetyInfo    DATABASE     �   CREATE DATABASE "safetyInfo" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
    DROP DATABASE "safetyInfo";
                postgres    false                        3079    17561    dblink 	   EXTENSION     :   CREATE EXTENSION IF NOT EXISTS dblink WITH SCHEMA public;
    DROP EXTENSION dblink;
                   false            �           0    0    EXTENSION dblink    COMMENT     _   COMMENT ON EXTENSION dblink IS 'connect to other PostgreSQL databases from within a database';
                        false    2            �            1255    17657    Kontragents_kg_kol()    FUNCTION       CREATE FUNCTION public."Kontragents_kg_kol"() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE
kol integer;

BEGIN

SELECT kg_kol INTO kol FROM kontragents 
where kg_id=new.io_ktr_id;

UPDATE kontragents set kg_kol=kol-1
where kg_id=new.io_ktr_id;


RETURN NEW;
END$$;
 -   DROP FUNCTION public."Kontragents_kg_kol"();
       public          postgres    false            �            1255    17517    arch_safe_id_gen()    FUNCTION       CREATE FUNCTION public.arch_safe_id_gen() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE
id_gen integer;
BEGIN
SELECT MAX(a_id)+1 INTO id_gen FROM arch_safe;
if id_gen is NULL 
	then id_gen = 1; 
	END IF;
NEW.a_id = id_gen;
NEW.a_date1 = CURRENT_TIMESTAMP;
RETURN NEW;
END$$;
 )   DROP FUNCTION public.arch_safe_id_gen();
       public          postgres    false            �            1255    17412    info_safe_id_gen()    FUNCTION       CREATE FUNCTION public.info_safe_id_gen() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE
id_gen integer;
BEGIN
SELECT MAX(io_id)+1 INTO id_gen FROM info_safe;
if id_gen is NULL 
	then id_gen = 1; 
	END IF;
NEW.io_id = id_gen;
NEW.io_date1 = CURRENT_TIMESTAMP;
RETURN NEW;
END$$;
 )   DROP FUNCTION public.info_safe_id_gen();
       public          postgres    false            �            1259    17506 	   arch_safe    TABLE     �   CREATE TABLE public.arch_safe (
    a_id integer NOT NULL,
    a_ktr_id integer,
    a_org_id integer,
    a_pc_id integer,
    a_pers_id integer,
    a_prim1 text,
    a_prim2 text,
    a_usr integer,
    a_date1 timestamp with time zone
);
    DROP TABLE public.arch_safe;
       public         heap    postgres    false            �            1259    17555 
   chain_pers    TABLE     �   CREATE TABLE public.chain_pers (
    chain_id integer NOT NULL,
    chain_otdel_id integer NOT NULL,
    chain_pers_id integer NOT NULL
);
    DROP TABLE public.chain_pers;
       public         heap    postgres    false            �            1259    17553    chain_pers_chain_id_seq    SEQUENCE     �   CREATE SEQUENCE public.chain_pers_chain_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.chain_pers_chain_id_seq;
       public          postgres    false    222            �           0    0    chain_pers_chain_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.chain_pers_chain_id_seq OWNED BY public.chain_pers.chain_id;
          public          postgres    false    221            �            1259    17413 	   info_safe    TABLE     �   CREATE TABLE public.info_safe (
    io_id integer NOT NULL,
    io_pers_id integer,
    io_pc_id integer,
    io_org_id integer,
    io_ktr_id integer,
    io_prim1 text,
    io_prim2 text,
    io_usr1 integer,
    io_date1 timestamp with time zone
);
    DROP TABLE public.info_safe;
       public         heap    postgres    false            �            1259    17419    kontragents    TABLE     �   CREATE TABLE public.kontragents (
    kg_id integer NOT NULL,
    kg_dgvr character varying(40),
    kg_kol integer,
    kg_arch integer,
    kg_skzi_id integer,
    kg_name_id integer
);
    DROP TABLE public.kontragents;
       public         heap    postgres    false            �            1259    17422    ktr_dgvr_kg_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ktr_dgvr_kg_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.ktr_dgvr_kg_id_seq;
       public          postgres    false    204            �           0    0    ktr_dgvr_kg_id_seq    SEQUENCE OWNED BY     L   ALTER SEQUENCE public.ktr_dgvr_kg_id_seq OWNED BY public.kontragents.kg_id;
          public          postgres    false    205            �            1259    17653    remote_personal    VIEW     U  CREATE VIEW public.remote_personal AS
 SELECT tbl.pe_fio,
    tbl.pe_tabn,
    tbl.pe_id
   FROM public.dblink('host=127.0.0.1 port=5432 user=postgres 
        password=masterpas dbname=spr_bahos'::text, 'SELECT pe_fio, pe_tabn, pe_id 
          FROM personal'::text) tbl(pe_fio character varying, pe_tabn character varying, pe_id integer);
 "   DROP VIEW public.remote_personal;
       public          postgres    false    2            �            1259    17424    skzi    TABLE     �   CREATE TABLE public.skzi (
    sk_id integer NOT NULL,
    sk_ver character varying(10),
    sk_serial character varying(50),
    sk_name_id integer,
    sk_inf_id integer,
    sk_srok character varying(20) NOT NULL
);
    DROP TABLE public.skzi;
       public         heap    postgres    false            �            1259    17427    spr_inf_sys    TABLE     e   CREATE TABLE public.spr_inf_sys (
    ins_id integer NOT NULL,
    ins_name character varying(30)
);
    DROP TABLE public.spr_inf_sys;
       public         heap    postgres    false            �            1259    17430    spr_inf_sys_ins_id_seq    SEQUENCE     �   CREATE SEQUENCE public.spr_inf_sys_ins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.spr_inf_sys_ins_id_seq;
       public          postgres    false    207            �           0    0    spr_inf_sys_ins_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.spr_inf_sys_ins_id_seq OWNED BY public.spr_inf_sys.ins_id;
          public          postgres    false    208            �            1259    17432    spr_ktr    TABLE     _   CREATE TABLE public.spr_ktr (
    kt_id integer NOT NULL,
    kt_name character varying(50)
);
    DROP TABLE public.spr_ktr;
       public         heap    postgres    false            �            1259    17435    spr_ktr_kt_id_seq    SEQUENCE     �   CREATE SEQUENCE public.spr_ktr_kt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.spr_ktr_kt_id_seq;
       public          postgres    false    209            �           0    0    spr_ktr_kt_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.spr_ktr_kt_id_seq OWNED BY public.spr_ktr.kt_id;
          public          postgres    false    210            �            1259    17437    spr_org    TABLE     q   CREATE TABLE public.spr_org (
    og_id integer NOT NULL,
    og_name character varying(40),
    og_recv text
);
    DROP TABLE public.spr_org;
       public         heap    postgres    false            �            1259    17443    spr_org_og_id_seq    SEQUENCE     �   CREATE SEQUENCE public.spr_org_og_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.spr_org_og_id_seq;
       public          postgres    false    211            �           0    0    spr_org_og_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.spr_org_og_id_seq OWNED BY public.spr_org.og_id;
          public          postgres    false    212            �            1259    17547 	   spr_otdel    TABLE     p   CREATE TABLE public.spr_otdel (
    otdel_id integer NOT NULL,
    otdel_name character varying(50) NOT NULL
);
    DROP TABLE public.spr_otdel;
       public         heap    postgres    false            �            1259    17545    spr_otdel_otdel_id_seq    SEQUENCE     �   CREATE SEQUENCE public.spr_otdel_otdel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.spr_otdel_otdel_id_seq;
       public          postgres    false    220            �           0    0    spr_otdel_otdel_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.spr_otdel_otdel_id_seq OWNED BY public.spr_otdel.otdel_id;
          public          postgres    false    219            �            1259    17445    spr_pc    TABLE     �   CREATE TABLE public.spr_pc (
    pc_id integer NOT NULL,
    pc_name character varying(20),
    pc_inv_num character varying(30)
);
    DROP TABLE public.spr_pc;
       public         heap    postgres    false            �            1259    17448    spr_pc_pc_id_seq    SEQUENCE     �   CREATE SEQUENCE public.spr_pc_pc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.spr_pc_pc_id_seq;
       public          postgres    false    213            �           0    0    spr_pc_pc_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.spr_pc_pc_id_seq OWNED BY public.spr_pc.pc_id;
          public          postgres    false    214            �            1259    17450    spr_po_skzi_ps_id_seq    SEQUENCE     �   CREATE SEQUENCE public.spr_po_skzi_ps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.spr_po_skzi_ps_id_seq;
       public          postgres    false    206            �           0    0    spr_po_skzi_ps_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public.spr_po_skzi_ps_id_seq OWNED BY public.skzi.sk_id;
          public          postgres    false    215            �            1259    17452    spr_skzi    TABLE     `   CREATE TABLE public.spr_skzi (
    ss_id integer NOT NULL,
    ss_name character varying(50)
);
    DROP TABLE public.spr_skzi;
       public         heap    postgres    false            �            1259    17455    spr_skzi_ss_id_seq    SEQUENCE     �   CREATE SEQUENCE public.spr_skzi_ss_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.spr_skzi_ss_id_seq;
       public          postgres    false    216            �           0    0    spr_skzi_ss_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.spr_skzi_ss_id_seq OWNED BY public.spr_skzi.ss_id;
          public          postgres    false    217            �
           2604    17558    chain_pers chain_id    DEFAULT     z   ALTER TABLE ONLY public.chain_pers ALTER COLUMN chain_id SET DEFAULT nextval('public.chain_pers_chain_id_seq'::regclass);
 B   ALTER TABLE public.chain_pers ALTER COLUMN chain_id DROP DEFAULT;
       public          postgres    false    221    222    222            �
           2604    17457    kontragents kg_id    DEFAULT     s   ALTER TABLE ONLY public.kontragents ALTER COLUMN kg_id SET DEFAULT nextval('public.ktr_dgvr_kg_id_seq'::regclass);
 @   ALTER TABLE public.kontragents ALTER COLUMN kg_id DROP DEFAULT;
       public          postgres    false    205    204            �
           2604    17458 
   skzi sk_id    DEFAULT     o   ALTER TABLE ONLY public.skzi ALTER COLUMN sk_id SET DEFAULT nextval('public.spr_po_skzi_ps_id_seq'::regclass);
 9   ALTER TABLE public.skzi ALTER COLUMN sk_id DROP DEFAULT;
       public          postgres    false    215    206            �
           2604    17459    spr_inf_sys ins_id    DEFAULT     x   ALTER TABLE ONLY public.spr_inf_sys ALTER COLUMN ins_id SET DEFAULT nextval('public.spr_inf_sys_ins_id_seq'::regclass);
 A   ALTER TABLE public.spr_inf_sys ALTER COLUMN ins_id DROP DEFAULT;
       public          postgres    false    208    207            �
           2604    17460    spr_ktr kt_id    DEFAULT     n   ALTER TABLE ONLY public.spr_ktr ALTER COLUMN kt_id SET DEFAULT nextval('public.spr_ktr_kt_id_seq'::regclass);
 <   ALTER TABLE public.spr_ktr ALTER COLUMN kt_id DROP DEFAULT;
       public          postgres    false    210    209            �
           2604    17461    spr_org og_id    DEFAULT     n   ALTER TABLE ONLY public.spr_org ALTER COLUMN og_id SET DEFAULT nextval('public.spr_org_og_id_seq'::regclass);
 <   ALTER TABLE public.spr_org ALTER COLUMN og_id DROP DEFAULT;
       public          postgres    false    212    211            �
           2604    17550    spr_otdel otdel_id    DEFAULT     x   ALTER TABLE ONLY public.spr_otdel ALTER COLUMN otdel_id SET DEFAULT nextval('public.spr_otdel_otdel_id_seq'::regclass);
 A   ALTER TABLE public.spr_otdel ALTER COLUMN otdel_id DROP DEFAULT;
       public          postgres    false    220    219    220            �
           2604    17462    spr_pc pc_id    DEFAULT     l   ALTER TABLE ONLY public.spr_pc ALTER COLUMN pc_id SET DEFAULT nextval('public.spr_pc_pc_id_seq'::regclass);
 ;   ALTER TABLE public.spr_pc ALTER COLUMN pc_id DROP DEFAULT;
       public          postgres    false    214    213            �
           2604    17463    spr_skzi ss_id    DEFAULT     p   ALTER TABLE ONLY public.spr_skzi ALTER COLUMN ss_id SET DEFAULT nextval('public.spr_skzi_ss_id_seq'::regclass);
 =   ALTER TABLE public.spr_skzi ALTER COLUMN ss_id DROP DEFAULT;
       public          postgres    false    217    216            �          0    17506 	   arch_safe 
   TABLE DATA           s   COPY public.arch_safe (a_id, a_ktr_id, a_org_id, a_pc_id, a_pers_id, a_prim1, a_prim2, a_usr, a_date1) FROM stdin;
    public          postgres    false    218   �[       �          0    17555 
   chain_pers 
   TABLE DATA           M   COPY public.chain_pers (chain_id, chain_otdel_id, chain_pers_id) FROM stdin;
    public          postgres    false    222   -]       �          0    17413 	   info_safe 
   TABLE DATA           }   COPY public.info_safe (io_id, io_pers_id, io_pc_id, io_org_id, io_ktr_id, io_prim1, io_prim2, io_usr1, io_date1) FROM stdin;
    public          postgres    false    203   n]       �          0    17419    kontragents 
   TABLE DATA           ^   COPY public.kontragents (kg_id, kg_dgvr, kg_kol, kg_arch, kg_skzi_id, kg_name_id) FROM stdin;
    public          postgres    false    204   �^       �          0    17424    skzi 
   TABLE DATA           X   COPY public.skzi (sk_id, sk_ver, sk_serial, sk_name_id, sk_inf_id, sk_srok) FROM stdin;
    public          postgres    false    206   �^       �          0    17427    spr_inf_sys 
   TABLE DATA           7   COPY public.spr_inf_sys (ins_id, ins_name) FROM stdin;
    public          postgres    false    207   W_       �          0    17432    spr_ktr 
   TABLE DATA           1   COPY public.spr_ktr (kt_id, kt_name) FROM stdin;
    public          postgres    false    209   �_       �          0    17437    spr_org 
   TABLE DATA           :   COPY public.spr_org (og_id, og_name, og_recv) FROM stdin;
    public          postgres    false    211   Q`       �          0    17547 	   spr_otdel 
   TABLE DATA           9   COPY public.spr_otdel (otdel_id, otdel_name) FROM stdin;
    public          postgres    false    220   �`       �          0    17445    spr_pc 
   TABLE DATA           <   COPY public.spr_pc (pc_id, pc_name, pc_inv_num) FROM stdin;
    public          postgres    false    213   a       �          0    17452    spr_skzi 
   TABLE DATA           2   COPY public.spr_skzi (ss_id, ss_name) FROM stdin;
    public          postgres    false    216   Va       �           0    0    chain_pers_chain_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.chain_pers_chain_id_seq', 11, true);
          public          postgres    false    221            �           0    0    ktr_dgvr_kg_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.ktr_dgvr_kg_id_seq', 12, true);
          public          postgres    false    205            �           0    0    spr_inf_sys_ins_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.spr_inf_sys_ins_id_seq', 2, true);
          public          postgres    false    208            �           0    0    spr_ktr_kt_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.spr_ktr_kt_id_seq', 10, true);
          public          postgres    false    210            �           0    0    spr_org_og_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.spr_org_og_id_seq', 6, true);
          public          postgres    false    212            �           0    0    spr_otdel_otdel_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.spr_otdel_otdel_id_seq', 7, true);
          public          postgres    false    219            �           0    0    spr_pc_pc_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.spr_pc_pc_id_seq', 3, true);
          public          postgres    false    214            �           0    0    spr_po_skzi_ps_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.spr_po_skzi_ps_id_seq', 11, true);
          public          postgres    false    215            �           0    0    spr_skzi_ss_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.spr_skzi_ss_id_seq', 6, true);
          public          postgres    false    217            
           2606    17513    arch_safe arch-safe_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.arch_safe
    ADD CONSTRAINT "arch-safe_pkey" PRIMARY KEY (a_id);
 D   ALTER TABLE ONLY public.arch_safe DROP CONSTRAINT "arch-safe_pkey";
       public            postgres    false    218                       2606    17560    chain_pers chain_pers_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.chain_pers
    ADD CONSTRAINT chain_pers_pkey PRIMARY KEY (chain_id);
 D   ALTER TABLE ONLY public.chain_pers DROP CONSTRAINT chain_pers_pkey;
       public            postgres    false    222            �
           2606    17465    kontragents ktr_dgvr_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.kontragents
    ADD CONSTRAINT ktr_dgvr_pkey PRIMARY KEY (kg_id);
 C   ALTER TABLE ONLY public.kontragents DROP CONSTRAINT ktr_dgvr_pkey;
       public            postgres    false    204            �
           2606    17467    info_safe main_table_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.info_safe
    ADD CONSTRAINT main_table_pkey PRIMARY KEY (io_id);
 C   ALTER TABLE ONLY public.info_safe DROP CONSTRAINT main_table_pkey;
       public            postgres    false    203                        2606    17469    spr_inf_sys spr_inf_sys_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.spr_inf_sys
    ADD CONSTRAINT spr_inf_sys_pkey PRIMARY KEY (ins_id);
 F   ALTER TABLE ONLY public.spr_inf_sys DROP CONSTRAINT spr_inf_sys_pkey;
       public            postgres    false    207                       2606    17471    spr_ktr spr_ktr_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.spr_ktr
    ADD CONSTRAINT spr_ktr_pkey PRIMARY KEY (kt_id);
 >   ALTER TABLE ONLY public.spr_ktr DROP CONSTRAINT spr_ktr_pkey;
       public            postgres    false    209                       2606    17473    spr_org spr_org_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.spr_org
    ADD CONSTRAINT spr_org_pkey PRIMARY KEY (og_id);
 >   ALTER TABLE ONLY public.spr_org DROP CONSTRAINT spr_org_pkey;
       public            postgres    false    211                       2606    17552    spr_otdel spr_otdel_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.spr_otdel
    ADD CONSTRAINT spr_otdel_pkey PRIMARY KEY (otdel_id);
 B   ALTER TABLE ONLY public.spr_otdel DROP CONSTRAINT spr_otdel_pkey;
       public            postgres    false    220                       2606    17475    spr_pc spr_pc_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.spr_pc
    ADD CONSTRAINT spr_pc_pkey PRIMARY KEY (pc_id);
 <   ALTER TABLE ONLY public.spr_pc DROP CONSTRAINT spr_pc_pkey;
       public            postgres    false    213            �
           2606    17477    skzi spr_po_skzi_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.skzi
    ADD CONSTRAINT spr_po_skzi_pkey PRIMARY KEY (sk_id);
 ?   ALTER TABLE ONLY public.skzi DROP CONSTRAINT spr_po_skzi_pkey;
       public            postgres    false    206                       2606    17479    spr_skzi spr_skzi_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.spr_skzi
    ADD CONSTRAINT spr_skzi_pkey PRIMARY KEY (ss_id);
 @   ALTER TABLE ONLY public.spr_skzi DROP CONSTRAINT spr_skzi_pkey;
       public            postgres    false    216                       2620    17659    info_safe Kontragents_kg_kol    TRIGGER     �   CREATE TRIGGER "Kontragents_kg_kol" BEFORE INSERT ON public.info_safe FOR EACH ROW EXECUTE FUNCTION public."Kontragents_kg_kol"();
 7   DROP TRIGGER "Kontragents_kg_kol" ON public.info_safe;
       public          postgres    false    203    227                       2620    17518    arch_safe arch_safe_id_gen    TRIGGER     {   CREATE TRIGGER arch_safe_id_gen BEFORE INSERT ON public.arch_safe FOR EACH ROW EXECUTE FUNCTION public.arch_safe_id_gen();
 3   DROP TRIGGER arch_safe_id_gen ON public.arch_safe;
       public          postgres    false    226    218                       2620    17480    info_safe info_safe_id_gen    TRIGGER     {   CREATE TRIGGER info_safe_id_gen BEFORE INSERT ON public.info_safe FOR EACH ROW EXECUTE FUNCTION public.info_safe_id_gen();
 3   DROP TRIGGER info_safe_id_gen ON public.info_safe;
       public          postgres    false    225    203            �   F  x����j1�g�Sd/1�m�>�]K���K���!�Уtn�,��d�Mi���F��~l	l�?K�� �N� n�&�.��U�����C��|N���S�l�$>��t�q�8D?$7@,�
���Ma�������F7����~�X ��� �`J����J8=��ž^�-�����U�U���I]�n�cR�N	�C���4�fݥ�c�^y+�2R�M,��m���vrA3����������r����U��X��g0�ͧ����S�z@��΃�|@IƱ�2GG2A��^Y�M�Q��Q����I�d��i	�m�f�i/UQ_
K��      �   1   x���  ��w<R����� ���P(�2��+#�I��V���-���m      �     x�mQ�m�0=�S�^X�G�%�	r	`xo���:�4@�Cg�6�h�i��(�x��"���3d��p4�8�A�Cj2C�h={���ከ���U.�.���I>�K��E�䳜�y)�v+�_�!e���cTIovQ4�8��e�{�k�g��M�Ǵ�����Q����[���l{�@^��W���R��%%�*���tjz��pw�)�r���E�Z���h-�)�Nk����r����V�U���moN�uC�w4~�M�|�b�      �   K   x��A�0��EEPrI��T�� ������~/u+��Ɔ�u��B[m��֖At�@P}�sRV�j��      �   `   x�5��� �{UX��^|��$v��(I�1����
�3d��Cf�5�EV�Pǎ�,�T;&}��(R6�����l��G�oc�=���      �   k   x�3⼰��-.컰�b���
�.l��za/P`7o����.N.SN##.c�����Tq�qBP�9��6\��ta�!�M@����m������� �@�      �   o   x�3��OOTH�KQ��/�,I�2�0�bÅ�_l��O�bۅ��^l���e�i�e�Y^�ZX�e�Y�Z�ZT�eƙ���e�YT�e�ijj�e�YX�eh�	ֿ��~�=... ��'{      �   ?   x�3��vRpsw
��r�S�r�2�0�¾�/츰L��6(\Xpaօ��i\1z\\\ ��      �   \   x�U�M
@P ��w�p�yq �R��^����n䕕��Ԍ/����FC����X�ح��5��
M���������H�5�p1��SOU_�>J      �   :   x�3�220�����5426515�2�200�433�2�,23�41155+rc���� ;
      �   t   x�3����W��2⼰��-.컰�b���
�.l��za/P`7o����.c�/l��(���� 鋍�.�p�p%���s�r�'gs�q��r��qqq �L7     