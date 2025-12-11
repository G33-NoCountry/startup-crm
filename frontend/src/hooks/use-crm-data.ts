import { useQuery } from '@tanstack/react-query';
import { contactsApi } from '@/lib/api/contactService';
import { dealService } from '@/lib/api/dealService';
import type { Deal } from '@/types/deal.types';

// Definición de Keys
const CONTACTS_QUERY_KEY = ['contacts-select-options'];
const DEALS_QUERY_KEY = ['deals-select-options'];

// Hook para obtener la lista de contactos para selects/comboboxes.
export const useContactsForSelect = () => {
    return useQuery({
        queryKey: CONTACTS_QUERY_KEY,
        queryFn: async () => {
            // Utilizamos un límite alto para asegurar que la mayoría de los contactos estén disponibles.
            // La API de contactos requiere 'limit'. Usaremos 250 como un valor razonable.
            const response = await contactsApi.getContacts({ limit: 250 }); 
            return response.items; 
        },
        staleTime: 1000 * 60 * 5, // 5 minutos de caché
        select: (data) => data.map(contact => ({ // Mapeo para el formato Combobox
            value: String(contact.id),
            label: `${contact.full_name} (${contact.email})`, 
        })),
    });
};

// Hook para obtener la lista de oportunidades (deals) para selects/comboboxes.
export const useDealsForSelect = () => {
    return useQuery({
        queryKey: DEALS_QUERY_KEY,
        queryFn: async (): Promise<Deal[]> => {
            // Asumimos que dealService.getAll() obtiene toda la lista sin paginación.
            return dealService.getAll(); 
        },
        staleTime: 1000 * 60 * 5, // 5 minutos de caché
        select: (data) => data.map(deal => ({ // Mapeo para el formato Combobox
            value: String(deal.id),
            label: deal.title, 
        })),
    });
};