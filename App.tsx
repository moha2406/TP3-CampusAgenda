
import { View, Text, FlatList } from 'react-native';

type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};

const evenements: Evenement[] = [];

function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits);
}

type Statut = 'Complet' | 'Presque complet' | 'Ouvert';

function statutEvenement(e: Evenement): Statut {
  const places = placesRestantes(e);

  if (places === 0) {
    return 'Complet';
  } else if (places <= 3) {
    return 'Presque complet';
  } else {
    return 'Ouvert';
  }
}

const totalEvenements = evenements.length;

const evenementsComplets = evenements.filter(
  e => statutEvenement(e) === 'Complet'
).length;

const evenementsAvecPlaces = evenements.filter(
  e => placesRestantes(e) > 0
).length;

const totalPlacesRestantes = evenements.reduce(
  (total, e) => total + placesRestantes(e),
  0
);

const ateliersDisponibles = evenements.filter(
  e => e.categorie === 'Atelier' && placesRestantes(e) > 0
);

const mode: 'tous' | 'ateliers' = 'ateliers';

const evenementsAffiches =
  mode === 'tous'
    ? evenements
    : evenements.filter(
        e => e.categorie === 'Atelier' && placesRestantes(e) > 0
      );

type BadgeEtatProps = {
  statut: Statut;
};

function BadgeEtat({ statut }: BadgeEtatProps) {
  return (
    <View>
      <Text>{statut}</Text>
    </View>
  );
}

type CarteEvenementProps = {
  evenement: Evenement;
};

function CarteEvenement({ evenement }: CarteEvenementProps) {
  return (
    <View
      style={{
        padding: 15,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#DDDDDD',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
        {evenement.titre}
      </Text>

      <Text style={{ marginBottom: 5 }}>
        {placesRestantes(evenement)} places libres
      </Text>

      <BadgeEtat statut={statutEvenement(evenement)} />
    </View>
  );
}

type BlocStatistiqueProps = {
  titre: string;
  valeur: number;
};

function BlocStatistique({ titre, valeur }: BlocStatistiqueProps) {
  return (
    <View
      style={{
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#DDDDDD',
      }}
    >
      <Text>{titre}</Text>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{valeur}</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#F5F6FA' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 5 }}>
        CampusAgenda
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 20, color: '#666' }}>
        Événements du campus
      </Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <View style={{ width: '48%' }}>
          <BlocStatistique titre="Événements" valeur={totalEvenements} />
        </View>

        <View style={{ width: '48%' }}>
          <BlocStatistique
            titre="Événements complets"
            valeur={evenementsComplets}
          />
        </View>

        <View style={{ width: '48%' }}>
          <BlocStatistique titre="Avec places" valeur={evenementsAvecPlaces} />
        </View>

        <View style={{ width: '48%' }}>
          <BlocStatistique
            titre="Places libres"
            valeur={totalPlacesRestantes}
          />
        </View>
      </View>

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>
        {mode === 'tous' ? 'Tous les événements' : 'Ateliers disponibles'}
      </Text>

      <FlatList
        data={evenementsAffiches}
        renderItem={({ item }) => (
          <CarteEvenement evenement={item} />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Aucun événement disponible.
          </Text>
        }
      />
    </View>
  );
}

































































