CREATE TABLE public.users(
    user_id uuid NOT NULL DEFAULT gen_random_uuid(),
    username character varying NULL,
    email character varying NULL,
    password character varying NULL,
    full_name text NULL,
    address text NULL,
    phone_number character varying NULL,
    role_id bigint NULL,
    gender character varying NULL,
    created_at timestamp with time zone NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)
TABLESPACE pg_default;

CREATE TABLE public.groups(
    group_id uuid NOT NULL DEFAULT gen_random_uuid(),
    group_name character varying NOT NULL,
    group_description character varying NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by uuid NULL,
    group_type character varying NULL,
    CONSTRAINT groups_pkey PRIMARY KEY (group_id),
    CONSTRAINT groups_created_by_fkey FOREIGN KEY (created_by) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
)
TABLESPACE pg_default;

CREATE TABLE public.group_members(
    group_id uuid NULL,
    user_id uuid NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    role character varying NULL,
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    CONSTRAINT group_members_pkey PRIMARY KEY (id),
    CONSTRAINT group_members_group_id_fkey FOREIGN KEY (group_id) REFERENCES GROUPS (group_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT group_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id)
)
TABLESPACE pg_default;

CREATE TABLE public.expenses(
    expense_id uuid NOT NULL DEFAULT gen_random_uuid(),
    group_id uuid NULL,
    description character varying NULL,
    expense_type character varying NULL,
    status character varying NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by uuid NULL,
    total_amount numeric NULL,
    paid_by uuid NULL,
    CONSTRAINT expenses_pkey PRIMARY KEY (expense_id),
    CONSTRAINT expenses_created_by_users_user_id_fk FOREIGN KEY (created_by) REFERENCES users(user_id),
    CONSTRAINT expenses_group_id_groups_group_id_fk FOREIGN KEY (group_id) REFERENCES GROUPS (group_id),
    CONSTRAINT expenses_paid_by_fkey FOREIGN KEY (paid_by) REFERENCES users(user_id)
)
TABLESPACE pg_default;

CREATE TABLE public.expense_participants(
    participant_id uuid NOT NULL DEFAULT gen_random_uuid(),
    expense_id uuid NULL,
    status character varying NULL,
    created_at timestamp with time zone NULL DEFAULT now(),
    amount numeric NULL,
    pending_from uuid NULL,
    paid_by uuid NULL,
    CONSTRAINT expense_participants_pkey PRIMARY KEY (participant_id),
    CONSTRAINT expense_participants_expense_id_expenses_expense_id_fk FOREIGN KEY (expense_id) REFERENCES expenses(expense_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT expense_participants_pending_from_fkey FOREIGN KEY (pending_from) REFERENCES users(user_id)
)
TABLESPACE pg_default;

CREATE TABLE public.activities(
    activity_id uuid NOT NULL DEFAULT gen_random_uuid(),
    activity_type character varying NULL,
    activity_description character varying NULL,
    status character varying NULL,
    created_by uuid NULL,
    group_id uuid NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT activities_pkey PRIMARY KEY (activity_id),
    CONSTRAINT activities_created_by_fkey FOREIGN KEY (created_by) REFERENCES users(user_id),
    CONSTRAINT activities_group_id_fkey FOREIGN KEY (group_id) REFERENCES GROUPS (group_id) ON UPDATE CASCADE ON DELETE CASCADE
)
TABLESPACE pg_default;

CREATE TABLE public.transactions(
    transaction_id uuid NOT NULL DEFAULT gen_random_uuid(),
    payer_id uuid NULL,
    payee_id uuid NULL,
    expense_id uuid NULL,
    amount numeric NULL,
    transaction_date timestamp with time zone NOT NULL,
    created_date timestamp with time zone NULL DEFAULT now(),
    CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id),
    CONSTRAINT transactions_expense_id_expenses_expense_id_fk FOREIGN KEY (expense_id) REFERENCES expenses(expense_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT transactions_payee_id_users_user_id_fk FOREIGN KEY (payee_id) REFERENCES users(user_id),
    CONSTRAINT transactions_payer_id_users_user_id_fk FOREIGN KEY (payer_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
)
TABLESPACE pg_default;

