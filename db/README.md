# PostgreSQL Database

## Instructions
All the files in `SommelIO/db/init/*.sql` are executed in order, hence the UUIDs change everytime the PostgreSQL container is composed.

Run the following command from `SommelIO/`:

### Run:
```bash
docker compose up
```

### Stop:
```bash
docker compose down -v
```

## International glossary (IT, FR, EN)
### Esame visivo / Examen visuel / Visual examination
| | |
|-|-|
| `LIMPIDEZZA`<br> `LIMPIDITÉ` <br> `LIMPIDITY` | `velato`/`abbastanza limpido`/`limpido`/`cristallino`/`brillante` <br> `voilé`/`assez limpide`/`limpide`/`cristallin`/`brillant` <br> `veiled`/`quite limpid`/`limpid`/`crystal clear`/`brilliant`|
| `COLORE` <br><br><br><br> `COULEUR` <br><br><br><br> `COLOUR` | **GIALLO**: `giallo verdolino`/`giallo paglierino`/`giallo dorato`/`giallo ambrato` <br> **ROSSO**: `rosso porpora`/`rosso rubino`/`rosso granato`/`rosso aranciato` <br> **ROSA**: `rosa tenue`/`rosa cerasuolo`/`rosa chiaretto` <br><br> **JAUNE**: `jaune vert pâle`/`jaune paillé`/`jaune doré`/`jaune ambré` <br> **ROUGE**: `rouge pourpre`/`rouge rubis`/`rouge grenat`/`rouge orangé` <br> **ROSÉ**: `rose faible`/`rose cerise`/`rose clairet` <br><br> **YELLOW**: `greenish yellow`/`straw yellow`/`golden yellow`/`amber` <br> **RED**: `purple red`/`ruby red`/`garnet`/`orange red` <br> **ROSÉ**: `soft rosé`/`cherry red`/`dark rosé`|
| `CONSISTENZA` <br> `CONSISTANCE` <br> `CONSISTENCY`| `fluido`/`poco consistente`/`abbastanza consistente`/`consistente`/`viscoso`<br> `fluide`/`peu consistant`/`assez consistant`/`consistant`/`visqueux` <br> `flowing`/`scarcely consistent`/`quite consistent`/`consistent`/`oily` |
| `EFFERVESCENZA` <br><br><br><br> `EFFERVESCENCE` <br><br><br><br> `EFFERVESCENCE` | **GRANA DELLE BOLLICINE**: `grossolane`/`abbastanza fini`/`fini` <br> **NUMERO DELLE BOLLICINE**: `scarse`/`abbastanza numerose`/`numerose` <br> **PERSISTENZA DEL PERLAGE**: `evanescenti`/`abbastanza persistenti`/`persistenti` <br><br> **GRAIN DES BULLES**: `grossières`/`assez fine`/`fines` <br> **NOMBRE DES BULLES**: `peu nombreuses`/`assez nombreuses`/`nombreuses` <br> **PERSISTANCE DU PERLAGE**: `evanescentes`/`assez persistantes`/`persistantes` <br><br> **SIZE OF BUBBLES**: `large`/`quite fine`/`fine` <br> **NUMBER OF BUBBLES**: `very few`/`quite numerous`/`numerous` <br> **PERSISTENCE OF PERLAGE**: `fading`/`quite persistent`/`persistent` |

### Esame olfattivo / Examen olfactif / Olfactory analysis
| | |
|-|-|
| `INTENSITÀ` <br> `INTENSITÉ` <br> `INTENSITY` | `carente`/`poco intenso`/`abbastanza intenso`/`intenso`/`molto intenso` <br> `dépourvu d'intensité`/`peu intense`/`intense`/`très intense` <br> `lacking`/`scarcely intense`/`quite intense`/`intense`/`very intense`|
| `COMPLESSITÀ` <br> `COMPLEXITÉ` <br> `COMPLEXITY` | `carente`/`poco complesso`/`abbastanza complesso`/`complesso`/`ampio` <br> `dépourvu de complexité`/`peu complexe`/`assez complexe`/`complexe`/`ample` <br> `lacking`/`scarcely complex`/`quite complex`/`complex`/`ample` |
| `QUALITÀ` <br> `QUALITÉ` <br> `QUALITY` | `comune`/`poco fine`/`abbastanza fine`/`fine`/`eccellente` <br> `commun`/`peu fin`/`assez fin`/`fin`/`excellent` <br> `coarse`/`scarcely fine`/`quite fine`/`fine`/`excellent` |
| `DESCRIZIONE` <br> `DESCRIPTION` <br> `DESCRIPTION` | `aromatico`/`vinoso`/`floreale`/`fruttato`/`erbaceo`/`minerale`/`fragrante`/`speziato`/`tostato`/`etereo` <br> `aromatique`/`vineux`/`floréal`/`fruité`/`herbacé`/`minérale`/`fragrant`/`épicé`/`toasté`/`éthéré` <br> `aromatic`/`vinous`/`floral`/`fruity`/`grassy`/`mineral`/`fragrant`/`spicy`/`toasted`/`ethereal`|

### Esame gusto-olfattivo / Examen gusto-olfactif / Olfactory-taste analysis
| | |
|-|-|
| `DOLCEZZA` <br> `DOUCEUR` <br> `SWEETNESS` | `secco`/`abboccato`/`amabile`/`dolce`/`stucchevole` <br> `sec`/`demi`/`moelleux`/`doux`/`ecœrant` <br> `dry`/`medium-dry`/`medium-sweet`/`sweet`/`excessively sweet` |
| `ALCOLI` <br> `ALCOOLS` <br> `ALCOHOLS` | `leggero`/`poco caldo`/`abbastanza caldo`/`caldo`/`alcolico` <br> `faible`/`peu chaud`/`assez chaud`/`chaud`/`alcoolique` <br> `light`/`lightly warm`/`medium warm`/`warm`/`alcoholic` |
| `MORBIDEZZA`<br> `MOELLEUX` <br> `SOFTNESS` | `spigoloso`/`poco morbido`/`abbastanza morbido`/`morbido`/`pastoso` <br> `anguleux`/`peu moelleux`/`assez moelleux`/`moelleux`/`pâteux` <br> `sharp`/`scarcely soft`/`quite soft`/`soft`/`velvety` |
| `ACIDITÀ` <br> `ACIDITÉ` <br> `ACIDITY` | `piatto`/`poco fresco`/`abbastanza fresco`/`fresco`/`acidulo` <br> `plat`/`peu frais`/`assez frais`/`frais`/`acidulé` <br> `flat`/`scarcely fresh`/`quite fresh`/`fresh`/`acidulous` |
| `TANNICITÀ` <br> `TENEUR EN TANNINS` <br> `TANNICITY` | `molle`/`poco tannico`/`abbastanza tannico`/`tannico`/`astringente` <br> `mou`/`peu tannique`/`assez tannique`/`tannique`/`astringent` <br> `flabby`/`scarcely tannic`/`quite tannic`/`tannic`/`astringent` |
| `SAPIDITÀ` <br> `SAPIDITÉ` <br> `SALTINESS` | `scipito`/`poco sapido`/`abbastanza sapido`/`sapido`/`salato` <br> `insipide`/`peu savoureux`/`assez savoureux`/`savoureux`/`salé` <br> `tasteless`/`scarcely tasty`/`quite tasty`/`tasty`/`salty` |
| `EQUILIBRIO` <br> `ÉQUILIBRE` <br> `BALANCE` | `poco equilibrato`/`abbastanza equilibrato`/`equilibrato` <br> `peu équilibré`/`assez équilibré`/`équilibré` <br> `unbalanced`/`quite balanced`/`balanced` |
| `INTENSITÀ` <br> `INTENSITÉ` <br> `INTENSITY` | `carente`/`poco intenso`/`abbastanza intenso`/`intenso`/`molto intenso` <br> `dépourvu d'intensité`/`peu intense`/`assez intense`/`intense`/`très intense` <br> `lacking`/`scarcely intense`/`quite intense`/`intense`/`very intense` |
| `PERSISTENZA` <br> `PERSISTANCE` <br> `PERSISTENCE` | `corto`/`poco persistente`/`abbastanza persistente`/`persistente`/`molto persistente` <br> `court`/`peu persistant`/`assez persistant`/`persistant`/`très persistant` <br> `short`/`scarcely persistent`/`quite persistent`/`persistent`/`very persistent` |
| `QUALITÀ` <br> `QUALITÉ` <br> `QUALITY` | `comune`/`poco fine`/`abbastanza fine`/`fine`/`eccellente` <br> `commun`/`peu fin`/`assez fin`/`fin`/`excellent` <br> `coarse`/`scarcely fine`/`quite fine`/`fine`/`excellent` |
| `STRUTTURA O CORPO` <br> `STRUCTURE OU CORP` <br> `STRUCTURE OR BODY` | `magro`/`debole`/`di corpo`/`robusto`/`pesante` <br> `mince`/`faible`/`corsé`/`robuste`/`lourd` <br> `thin`/`weak`/`full`/`vigorous`/`heavy` |

### Considerazioni finali / Considérations finales / Final considerations
| | |
|-|-|
| `STATO EVOLUTIVO` <br> `ÉTAT ÉVOLUTIF` <br> `EVOLUTIONARY STATE` | `immaturo`/`giovane`/`pronto`/`maturo`/`vecchio` <br> `vert`/`jeune`/`prêt`/`mûr`/`vieux` <br> `immature`/`young`/`ready`/`mature`/`old` |
| `ARMONIA` <br> `HARMONIE` <br> `HARMONY` | `poco armonico`/`abbastanza armonico`/`armonico` <br> `peu harmonieux`/`assez harmonieux`/`harmonieux` <br> `disharmonious`/`quite harmonious`/`harmonious` |

