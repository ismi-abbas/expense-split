export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			activities: {
				Row: {
					activity_description: string | null;
					activity_id: string;
					activity_type: string | null;
					created_at: string;
					created_by: string | null;
					group_id: string | null;
					status: string | null;
				};
				Insert: {
					activity_description?: string | null;
					activity_id?: string;
					activity_type?: string | null;
					created_at?: string;
					created_by?: string | null;
					group_id?: string | null;
					status?: string | null;
				};
				Update: {
					activity_description?: string | null;
					activity_id?: string;
					activity_type?: string | null;
					created_at?: string;
					created_by?: string | null;
					group_id?: string | null;
					status?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'activities_created_by_fkey';
						columns: ['created_by'];
						referencedRelation: 'users';
						referencedColumns: ['user_id'];
					},
					{
						foreignKeyName: 'activities_group_id_fkey';
						columns: ['group_id'];
						referencedRelation: 'groups';
						referencedColumns: ['group_id'];
					},
				];
			};
			expense_participants: {
				Row: {
					amount: number | null;
					created_at: string | null;
					expense_id: string | null;
					participant_id: string;
					pending_from: string | null;
					status: string | null;
				};
				Insert: {
					amount?: number | null;
					created_at?: string | null;
					expense_id?: string | null;
					participant_id?: string;
					pending_from?: string | null;
					status?: string | null;
				};
				Update: {
					amount?: number | null;
					created_at?: string | null;
					expense_id?: string | null;
					participant_id?: string;
					pending_from?: string | null;
					status?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'expense_participants_expense_id_expenses_expense_id_fk';
						columns: ['expense_id'];
						referencedRelation: 'expenses';
						referencedColumns: ['expense_id'];
					},
					{
						foreignKeyName: 'expense_participants_pending_from_fkey';
						columns: ['pending_from'];
						referencedRelation: 'users';
						referencedColumns: ['user_id'];
					},
				];
			};
			expenses: {
				Row: {
					created_at: string;
					created_by: string | null;
					description: string | null;
					expense_id: string;
					expense_type: string | null;
					group_id: string | null;
					paid_by: string | null;
					status: string | null;
					total_amount: number | null;
				};
				Insert: {
					created_at?: string;
					created_by?: string | null;
					description?: string | null;
					expense_id?: string;
					expense_type?: string | null;
					group_id?: string | null;
					paid_by?: string | null;
					status?: string | null;
					total_amount?: number | null;
				};
				Update: {
					created_at?: string;
					created_by?: string | null;
					description?: string | null;
					expense_id?: string;
					expense_type?: string | null;
					group_id?: string | null;
					paid_by?: string | null;
					status?: string | null;
					total_amount?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: 'expenses_created_by_users_user_id_fk';
						columns: ['created_by'];
						referencedRelation: 'users';
						referencedColumns: ['user_id'];
					},
					{
						foreignKeyName: 'expenses_group_id_groups_group_id_fk';
						columns: ['group_id'];
						referencedRelation: 'groups';
						referencedColumns: ['group_id'];
					},
					{
						foreignKeyName: 'expenses_paid_by_fkey';
						columns: ['paid_by'];
						referencedRelation: 'users';
						referencedColumns: ['user_id'];
					},
				];
			};
			group_members: {
				Row: {
					created_at: string;
					group_id: string | null;
					id: string;
					role: string | null;
					user_id: string | null;
				};
				Insert: {
					created_at?: string;
					group_id?: string | null;
					id?: string;
					role?: string | null;
					user_id?: string | null;
				};
				Update: {
					created_at?: string;
					group_id?: string | null;
					id?: string;
					role?: string | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'group_members_group_id_fkey';
						columns: ['group_id'];
						referencedRelation: 'groups';
						referencedColumns: ['group_id'];
					},
					{
						foreignKeyName: 'group_members_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'users';
						referencedColumns: ['user_id'];
					},
				];
			};
			groups: {
				Row: {
					created_at: string;
					created_by: string | null;
					group_description: string | null;
					group_id: string;
					group_name: string | null;
					group_type: string | null;
				};
				Insert: {
					created_at?: string;
					created_by?: string | null;
					group_description?: string | null;
					group_id?: string;
					group_name?: string | null;
					group_type?: string | null;
				};
				Update: {
					created_at?: string;
					created_by?: string | null;
					group_description?: string | null;
					group_id?: string;
					group_name?: string | null;
					group_type?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'groups_created_by_fkey';
						columns: ['created_by'];
						referencedRelation: 'users';
						referencedColumns: ['user_id'];
					},
				];
			};
			transactions: {
				Row: {
					amount: number | null;
					created_date: string | null;
					expense_id: string | null;
					payee_id: string | null;
					payer_id: string | null;
					transaction_date: string;
					transaction_id: string;
				};
				Insert: {
					amount?: number | null;
					created_date?: string | null;
					expense_id?: string | null;
					payee_id?: string | null;
					payer_id?: string | null;
					transaction_date: string;
					transaction_id?: string;
				};
				Update: {
					amount?: number | null;
					created_date?: string | null;
					expense_id?: string | null;
					payee_id?: string | null;
					payer_id?: string | null;
					transaction_date?: string;
					transaction_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'transactions_expense_id_expenses_expense_id_fk';
						columns: ['expense_id'];
						referencedRelation: 'expenses';
						referencedColumns: ['expense_id'];
					},
					{
						foreignKeyName: 'transactions_payee_id_users_user_id_fk';
						columns: ['payee_id'];
						referencedRelation: 'users';
						referencedColumns: ['user_id'];
					},
					{
						foreignKeyName: 'transactions_payer_id_users_user_id_fk';
						columns: ['payer_id'];
						referencedRelation: 'users';
						referencedColumns: ['user_id'];
					},
				];
			};
			users: {
				Row: {
					address: string | null;
					created_at: string | null;
					email: string | null;
					full_name: string | null;
					gender: string | null;
					password: string | null;
					phone_number: string | null;
					role_id: number | null;
					user_id: string;
					username: string | null;
				};
				Insert: {
					address?: string | null;
					created_at?: string | null;
					email?: string | null;
					full_name?: string | null;
					gender?: string | null;
					password?: string | null;
					phone_number?: string | null;
					role_id?: number | null;
					user_id?: string;
					username?: string | null;
				};
				Update: {
					address?: string | null;
					created_at?: string | null;
					email?: string | null;
					full_name?: string | null;
					gender?: string | null;
					password?: string | null;
					phone_number?: string | null;
					role_id?: number | null;
					user_id?: string;
					username?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			expense_status: 'settled' | 'unsettled';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
