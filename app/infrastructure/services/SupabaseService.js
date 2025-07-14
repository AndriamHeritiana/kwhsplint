import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dbhyldjfxzeiobytfmgg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiaHlsZGpmeHplaW9ieXRmbWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDAxMTYsImV4cCI6MjA2NzAxNjExNn0.QTZL__JfjmSc4tMz3vIPOUdLlMxi-WDdQpglZgsyk9c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Fonction pour connecter l'utilisateur
// Fonction pour connecter l'utilisateur
export const signIn = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.error('Erreur Supabase signIn :', error.message);
            throw error;
        }
        console.log('Connexion réussie :', data.user);
        return data.user;
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        return null;
    }
};

// Fonction pour vérifier l'état de l'authentification
export const getCurrentUser = async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            console.log('Aucun utilisateur connecté');
            return null;
        }
        console.log('Utilisateur actuel :', user);
        return user;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        return null;
    }
};

// Fonction pour récupérer une URL signée pour l'image par défaut
export const getDefaultAvatarSignedUrl = async () => {
    try {
        // Authentifiez l'utilisateur admin
        const user = await signIn('admin@admin.com', 'admin@1234');
        if (!user) {
            throw new Error('Échec de l\'authentification');
        }

        // Générez une URL signée pour avatar.jpg (valide 1 heure)
        const { data, error } = await supabase.storage
            .from('avatars')
            .createSignedUrl('avatar.png', 3600); // 3600 secondes = 1 heure
        if (error) {
            console.error('Erreur lors de la génération de l\'URL signée :', error.message);
            throw error;
        }
        return data.signedUrl;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'URL signée :', error);
        return 'https://via.placeholder.com/100'; // URL de secours
    }
};

// Fonction pour téléverser une image de profil
export const uploadProfileImage = async (userId, file) => {
    try {
        // Vérifiez que l'utilisateur est connecté
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            throw new Error('Aucun utilisateur connecté');
        }

        // Téléversez l'image dans le bucket avatars/
        // const filePath = `${userId}/${file.name}`; // Pour qu'il creer un sous dossier avec le nom de l'utilisateur
        const filePath = file.name;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, {
                uri: file.uri,
                type: file.type,
                name: file.name,
            }, {
                contentType: file.type,
            });

        if (uploadError) {
            console.error('Erreur lors du téléversement de l\'image :', uploadError.message);
            throw uploadError;
        }

        // Générez une URL signée pour l'image téléversée
        const { data: signedData, error: signedError } = await supabase.storage
            .from('avatars')
            .createSignedUrl(filePath, 3600);
        if (signedError) {
            console.error('Erreur lors de la génération de l\'URL signée :', signedError.message);
            throw signedError;
        }

        return signedData.signedUrl;
    } catch (error) {
        console.error('Erreur lors du téléversement de l\'image de profil :', error);
        return null;
    }
};
