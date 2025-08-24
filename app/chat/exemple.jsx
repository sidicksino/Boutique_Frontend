import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AdminScreen() {
  const [items, setItems] = useState([
    { id: "1", title: "Card 1", description: "Première carte" },
    { id: "2", title: "Card 2", description: "Deuxième carte" },
    { id: "3", title: "Promo Été", description: "Réduction -20% sur T-shirts" },
  ]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [search, setSearch] = useState("");

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q)
    );
  }, [items, search]);

  const addItem = () => {
    if (!title.trim()) {
      Alert.alert("Champ manquant", "Le titre est obligatoire.");
      return;
    }
    const newItem = {
      id: Date.now().toString(),
      title: title.trim(),
      description: desc.trim(),
    };
    setItems([newItem, ...items]);
    setTitle("");
    setDesc("");
  };

  const confirmDelete = (id) => {
    Alert.alert("Supprimer", "Voulez-vous vraiment supprimer cet élément ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => setItems(items.filter((i) => i.id !== id)),
      },
    ]);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditDesc(item.description);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) {
      Alert.alert("Champ manquant", "Le titre est obligatoire.");
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === editingItem.id
          ? { ...i, title: editTitle.trim(), description: editDesc.trim() }
          : i
      )
    );
    setEditModalVisible(false);
    setEditingItem(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc}>{item.description}</Text>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#0ea5e9" }]}
          onPress={() => openEdit(item)}
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#ef4444" }]}
          onPress={() => confirmDelete(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Titre */}
      <Text style={styles.header}>📊 Admin Dashboard</Text>

      {/* Barre de recherche */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color="#64748b" />
        <TextInput
          placeholder="Rechercher par titre ou description..."
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        {search ? (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={18} color="#64748b" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Formulaire d'ajout */}
      <View style={styles.form}>
        <Text style={styles.formTitle}>Nouvelle carte</Text>
        <TextInput
          style={styles.input}
          placeholder="Titre (obligatoire)"
          placeholderTextColor="#94a3b8"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, { height: 90, textAlignVertical: "top" }]}
          placeholder="Description"
          placeholderTextColor="#94a3b8"
          value={desc}
          onChangeText={setDesc}
          multiline
        />
        <TouchableOpacity style={styles.addBtn} onPress={addItem}>
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.addBtnText}>Ajouter</Text>
        </TouchableOpacity>
      </View>

      {/* Liste */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucun élément trouvé.</Text>
        }
      />

      {/* Modal d'édition */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Modifier</Text>
            <TextInput
              style={styles.input}
              placeholder="Titre"
              placeholderTextColor="#94a3b8"
              value={editTitle}
              onChangeText={setEditTitle}
            />
            <TextInput
              style={[styles.input, { height: 90, textAlignVertical: "top" }]}
              placeholder="Description"
              placeholderTextColor="#94a3b8"
              value={editDesc}
              onChangeText={setEditDesc}
              multiline
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#e2e8f0" }]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={[styles.modalBtnText, { color: "#0f172a" }]}>
                  Annuler
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#16a34a" }]}
                onPress={saveEdit}
              >
                <Text style={styles.modalBtnText}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", padding: 16 },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f8fafc",
    marginBottom: 16,
  },

  /* Recherche */
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#0b1220",
    borderColor: "#1e293b",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    color: "#e2e8f0",
    fontSize: 14,
  },

  /* Formulaire */
  form: {
    backgroundColor: "#0b1220",
    borderColor: "#1e293b",
    borderWidth: 1,
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
  },
  formTitle: {
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#0f172a",
    borderColor: "#334155",
    borderWidth: 1,
    color: "#e2e8f0",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 10,
    fontSize: 14,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 12,
  },
  addBtnText: { color: "#fff", fontWeight: "600" },

  /* Card */
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#0b1220",
    borderColor: "#1e293b",
    borderWidth: 1,
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
  },
  cardTitle: {
    color: "#f1f5f9",
    fontSize: 16,
    fontWeight: "700",
  },
  cardDesc: { color: "#94a3b8", marginTop: 4, fontSize: 13 },
  cardActions: { flexDirection: "row", gap: 8 },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Vide */
  emptyText: { color: "#94a3b8", textAlign: "center", marginTop: 24 },

  /* Modal */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    justifyContent: "center",
    padding: 16,
  },
  modalCard: {
    backgroundColor: "#0b1220",
    borderColor: "#1e293b",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    color: "#f1f5f9",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
    marginTop: 8,
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  modalBtnText: { color: "#fff", fontWeight: "600" },
});
