--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: anshaal
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    category_name character varying(255) NOT NULL
);


ALTER TABLE public.categories OWNER TO anshaal;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: anshaal
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO anshaal;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: anshaal
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: resources; Type: TABLE; Schema: public; Owner: anshaal
--

CREATE TABLE public.resources (
    id integer NOT NULL,
    user_id integer,
    category_id integer,
    url character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    description text
);


ALTER TABLE public.resources OWNER TO anshaal;

--
-- Name: resources_id_seq; Type: SEQUENCE; Schema: public; Owner: anshaal
--

CREATE SEQUENCE public.resources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.resources_id_seq OWNER TO anshaal;

--
-- Name: resources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: anshaal
--

ALTER SEQUENCE public.resources_id_seq OWNED BY public.resources.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: anshaal
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer,
    resource_id integer,
    rating smallint DEFAULT 0 NOT NULL,
    comment text,
    hit_like smallint DEFAULT 0 NOT NULL
);


ALTER TABLE public.reviews OWNER TO anshaal;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: anshaal
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO anshaal;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: anshaal
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: anshaal
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO anshaal;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: anshaal
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO anshaal;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: anshaal
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: anshaal
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: resources id; Type: DEFAULT; Schema: public; Owner: anshaal
--

ALTER TABLE ONLY public.resources ALTER COLUMN id SET DEFAULT nextval('public.resources_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: anshaal
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: anshaal
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: anshaal
--

COPY public.categories (id, category_name) FROM stdin;
1	Programming
2	Language
3	Science
4	 Data Science
5	Art
6	Health
7	Medical
8	News
\.


--
-- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: anshaal
--

COPY public.resources (id, user_id, category_id, url, title, description) FROM stdin;
1	1	1	https://til.cybertec-postgresql.com/post/2019-09-02-Postgres-Constraint-Naming-Convention	title	message
2	1	2	https://til.cybertec-postgresql.com/post/2019-09-02-Postgres-Constraint-Naming-Convention	title	message
3	1	3	https://til.cybertec-postgresql.com/post/2019-09-02-Postgres-Constraint-Naming-Convention	title	message
4	2	1	https://til.cybertec-postgresql.com/post/2019-09-02-Postgres-Constraint-Naming-Convention	title	message
5	2	2	https://til.cybertec-postgresql.com/post/2019-09-02-Postgres-Constraint-Naming-Convention	title	message
6	2	3	https://til.cybertec-postgresql.com/post/2019-09-02-Postgres-Constraint-Naming-Convention	title	message
7	3	1	https://til.cybertec-postgresql.com/post/2019-09-02-Postgres-Constraint-Naming-Convention	title	message
8	3	2	https://til.cybertec-postgresql.com/post/2019-09-02-Postgres-Constraint-Naming-Convention	title	message
9	3	3	https://til.cybertec-postgresql.com/post/2019-09-02-Postgres-Constraint-Naming-Convention	title	message
10	4	1	https://til.cybertec-postgresql.com/post/2019-09-02-Postgres-Constraint-Naming-Convention	title	message
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: anshaal
--

COPY public.reviews (id, user_id, resource_id, rating, comment, hit_like) FROM stdin;
1	1	1	4	comment	12
2	1	2	3	comment	34
3	1	3	2	comment	23
4	2	1	1	comment	56
5	2	2	3	comment	67
6	2	3	4	comment	67
7	3	1	2	comment	78
8	3	2	3	comment	76
9	4	1	2	comment	34
10	4	2	1	comment	56
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: anshaal
--

COPY public.users (id, name, email, password) FROM stdin;
1	Devin Sanders	tristanjacobs@gmail.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
2	Iva Harrison	allisonjackson@mail.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
3	Lloyd Jefferson	asherpoole@gmx.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
4	Dale Coleman	michaelgray@mail.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
5	Alejandro Osborne	ariaatkinson@outlook.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
6	Nell Medina	juliansantos@aol.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
7	Estelle Walsh	elistanton@yahoo.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
8	Herbert Graves	emilyowen@live.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
9	John Stevens	charliebattle@yahoo.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
10	Isabelle Robbins	miasutton@aol.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
11	Jerome Wright	bellaanthony@gmail.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
12	May Barrett	gabriellabarrera@aol.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
13	Christine Buchanan	nathannguyen@ymail.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
14	Oscar Little	alainamcfarland@hotmail.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
15	Mabelle Hughes	jordansears@outlook.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
16	Adelaide Harrington	ariawolfe@outlook.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
17	Ola Brock	alainajames@gmail.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
18	Gavin Cook	nolanbriggs@gmail.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
19	Harriett Alvarez	kaelynross@gmail.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
20	Effie Simpson	muhammadwebb@hotmail.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
21	Mamie Webster	ianhale@ymail.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
22	Jennie Powers	lilabell@live.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
23	Maggie Norris	miafletcher@inbox.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
24	Justin Reyes	austindotson@aol.com	$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anshaal
--

SELECT pg_catalog.setval('public.categories_id_seq', 8, true);


--
-- Name: resources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anshaal
--

SELECT pg_catalog.setval('public.resources_id_seq', 10, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anshaal
--

SELECT pg_catalog.setval('public.reviews_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: anshaal
--

SELECT pg_catalog.setval('public.users_id_seq', 24, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: anshaal
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: resources resources_pkey; Type: CONSTRAINT; Schema: public; Owner: anshaal
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: anshaal
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: anshaal
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: resources resources_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: anshaal
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: resources resources_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: anshaal
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_resource_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: anshaal
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES public.resources(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: anshaal
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

