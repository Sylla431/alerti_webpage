import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Alerti",
  description:
    "Politique de confidentialité d’Alerti : données collectées, finalités, conservation, sécurité et droits des utilisateurs.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-[#004AAD]">Alerti</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
                Politique de confidentialité
              </h1>
              <p className="mt-3 text-gray-600">
                Version inspirée des principes du RGPD
                <br />
                Dernière mise à jour :{" "}
                <span className="font-semibold">30 janvier 2026</span>
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#004AAD] px-5 py-3 text-white font-bold hover:bg-[#003b8a] transition-colors"
            >
              Retour à l’accueil
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-none text-gray-900 text-base sm:text-lg leading-relaxed space-y-6">
          <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-gray-900">
            1. Responsable du traitement
          </h2>
          <p>
            Le responsable du traitement des données personnelles collectées via l’application Alerti est :
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Nom</strong> : Fatoumata Dembele
            </li>
            <li>
              <strong>Pays d’exploitation</strong> : Mali
            </li>
            <li>
              <strong>Email</strong> :{" "}
              <a href="mailto:alertino25@gmail.com">alertino25@gmail.com</a>
            </li>
            <li>
              <strong>Téléphone</strong> : [à compléter]
            </li>
          </ul>
          <p>
            Le responsable détermine les finalités et les moyens du traitement des données personnelles.
          </p>

          <h2 className="mt-8 text-xl sm:text-2xl font-semibold text-gray-900">
            2. Présentation de l’application
          </h2>
          <p>
            Alerti est une application mobile d’alerte précoce visant à prévenir les risques d’inondation
            grâce à des capteurs intelligents et un système de notifications en temps réel.
          </p>
          <p>L’infrastructure technique utilise notamment :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Google Firebase</strong> (authentification, base de données, notifications push)
            </li>
            <li>
              <strong>HiveMQ</strong> (communication des capteurs via protocole MQTT)
            </li>
          </ul>

          <h2 className="mt-8 text-xl sm:text-2xl font-semibold text-gray-900">
            3. Données collectées
          </h2>
          <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-900">
            3.1 Données fournies par l’utilisateur
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone</li>
            <li>Mot de passe (chiffré)</li>
            <li>Identifiant utilisateur</li>
          </ul>

          <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-900">
            3.2 Données de localisation (obligatoires)
          </h3>
          <p>La localisation GPS est requise pour :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Déterminer la zone géographique à risque</li>
            <li>Envoyer des alertes adaptées à la position de l’utilisateur</li>
            <li>Garantir la pertinence des notifications d’urgence</li>
          </ul>
          <p>
            La désactivation de la localisation empêche l’utilisation complète du service.
          </p>

          <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-900">
            3.3 Données techniques
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Adresse IP</li>
            <li>Type d’appareil</li>
            <li>Système d’exploitation</li>
            <li>Logs techniques</li>
            <li>Données liées aux notifications</li>
          </ul>

          <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-900">
            3.4 Données issues des capteurs
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Niveau d’eau</li>
            <li>Données environnementales</li>
            <li>Horodatage</li>
            <li>Identifiant du capteur</li>
          </ul>
          <p>Ces données ne sont pas des données personnelles.</p>

          <h2 className="mt-8 text-xl sm:text-2xl font-semibold text-gray-900">
            4. Finalités du traitement
          </h2>
          <p>Les données sont collectées pour :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Fournir des alertes en temps réel</li>
            <li>Envoyer des notifications push</li>
            <li>Envoyer des SMS d’urgence</li>
            <li>Gérer les comptes utilisateurs</li>
            <li>Améliorer le système d’alerte</li>
            <li>Assurer la sécurité et la stabilité technique</li>
          </ul>
          <p>Aucune donnée n’est vendue à des tiers.</p>

          <h2 className="mt-8 text-xl sm:text-2xl font-semibold text-gray-900">
            5. Principes appliqués
          </h2>
          <p>
            Alerti applique les principes suivants inspirés des standards internationaux de protection des
            données :
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Collecte limitée aux données nécessaires</li>
            <li>Utilisation uniquement pour les finalités définies</li>
            <li>Conservation limitée dans le temps</li>
            <li>Sécurisation des données</li>
            <li>Transparence envers les utilisateurs</li>
          </ul>

          <h2 className="mt-8 text-xl sm:text-2xl font-semibold text-gray-900">
            6. Partage des données
          </h2>
          <p>
            Les données peuvent être partagées uniquement avec des prestataires techniques nécessaires au
            fonctionnement du service :
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Google Firebase</li>
            <li>HiveMQ</li>
            <li>Prestataires d’envoi de SMS</li>
          </ul>
          <p>Ces prestataires sont soumis à des obligations de confidentialité et de sécurité.</p>
          <p>Aucune donnée n’est utilisée à des fins publicitaires.</p>

          <h2 className="mt-8 text-xl sm:text-2xl font-semibold text-gray-900">
            7. Hébergement et transfert
          </h2>
          <p>
            Les données peuvent être hébergées sur des serveurs situés en dehors du Mali. Des mesures
            techniques et organisationnelles sont mises en place pour garantir leur protection.
          </p>

          <h2 className="mt-8 text-xl sm:text-2xl font-semibold text-gray-900">
            8. Sécurité des données
          </h2>
          <p>Les mesures de sécurité incluent notamment :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Chiffrement des communications (HTTPS / TLS)</li>
            <li>Mots de passe chiffrés</li>
            <li>Accès restreint aux administrateurs</li>
            <li>Sauvegardes sécurisées</li>
            <li>Surveillance des accès</li>
          </ul>

          <h2 className="mt-8 text-xl sm:text-2xl font-semibold text-gray-900">
            9. Durée de conservation
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Données de compte : conservées tant que le compte est actif</li>
            <li>Données techniques : conservées selon nécessité opérationnelle</li>
            <li>
              Données capteurs : conservées à des fins statistiques et d’amélioration du service
            </li>
          </ul>

          <h2 className="mt-8 text-xl sm:text-2xl font-semibold text-gray-900">
            10. Droits des utilisateurs
          </h2>
          <p>Chaque utilisateur peut :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Demander l’accès à ses données</li>
            <li>Demander la correction de ses informations</li>
            <li>Demander la suppression de son compte</li>
            <li>Retirer son consentement</li>
          </ul>
          <p>
            Toute demande peut être adressée à :{" "}
            <a href="mailto:alertino25@gmail.com">alertino25@gmail.com</a>
          </p>

          <h2 className="mt-8 text-xl sm:text-2xl font-semibold text-gray-900">
            11. Modification de la politique
          </h2>
          <p>
            Cette politique peut être mise à jour à tout moment afin de refléter l’évolution du service ou
            des exigences légales. Les utilisateurs seront informés en cas de modification importante.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-gray-100 bg-[#004AAD]/5 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-gray-700">
              Besoin d’une version adaptée (mentions légales, CGU, politique cookies détaillée) ?
            </p>
            <a
              href="mailto:alertino25@gmail.com"
              className="inline-flex items-center justify-center rounded-full bg-[#F54B4D] px-5 py-3 text-white font-bold hover:bg-[#d84042] transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

